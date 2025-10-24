import axios from 'axios';

// Types for Runware API
export interface ImageGenerationRequest {
  taskType: 'imageInference';
  taskUUID?: string;
  positivePrompt: string;
  negativePrompt?: string;
  height?: number;
  width?: number;
  model?: string;
  steps?: number;
  CFGScale?: number;
  seed?: number;
  numberResults?: number;
  outputFormat?: 'JPG' | 'PNG' | 'WEBP';
}

export interface VideoGenerationRequest {
  taskType: 'videoInference';
  taskUUID?: string;
  positivePrompt: string;
  negativePrompt?: string;
  height?: number;
  width?: number;
  model?: string;
  steps?: number;
  CFGScale?: number;
  seed?: number;
  frames?: number;
  fps?: number;
}

export interface RunwareResponse {
  taskUUID: string;
  taskType: string;
  status: 'success' | 'error' | 'processing';
  imageURL?: string;
  videoURL?: string;
  error?: string;
  processingTime?: number;
}

export class RunwareAPI {
  private apiKey: string;
  private baseURL: string;
  private axiosInstance;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.RUNWARE_API_KEY || '';
    this.baseURL = 'https://api.runware.ai/v1';
    
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60 seconds timeout
    });
  }

  // Generate images using Runware API
  async generateImage(params: ImageGenerationRequest): Promise<RunwareResponse> {
    try {
      const taskUUID = params.taskUUID || this.generateUUID();
      
      // Runware API expects an array of tasks
      const requestData = [{
        taskType: 'imageInference',
        taskUUID: taskUUID,
        positivePrompt: params.positivePrompt,
        height: params.height || 1024,
        width: params.width || 1024,
        model: params.model || 'runware:101@1',  // FLUX.1 Dev model
        steps: params.steps || 20,
        CFGScale: params.CFGScale || 3.5, // FLUX models work better with lower CFG
        seed: params.seed,
        numberResults: params.numberResults || 1,
        outputFormat: params.outputFormat || 'JPG',
        outputType: 'URL',
        deliveryMethod: 'sync',
        ...(params.negativePrompt && { negativePrompt: params.negativePrompt })
      }];

      console.log('Sending request to Runware API:', JSON.stringify(requestData, null, 2));

      const response = await this.axiosInstance.post('', requestData);
      
      console.log('Runware API response:', JSON.stringify(response.data, null, 2));

      // Runware API returns results in data array
      if (response.data?.data && response.data.data.length > 0) {
        const result = response.data.data[0];
        return {
          taskUUID: result.taskUUID,
          taskType: result.taskType,
          status: 'success',
          imageURL: result.imageURL,
          processingTime: result.processingTime,
        };
      } else if (response.data?.errors) {
        throw new Error(response.data.errors[0]?.message || 'Generation failed');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      throw this.handleError(error);
    }
  }

  // Generate videos using Runware API
  async generateVideo(params: VideoGenerationRequest): Promise<RunwareResponse> {
    try {
      const requestData = {
        taskType: 'videoInference',
        taskUUID: params.taskUUID || this.generateUUID(),
        positivePrompt: params.positivePrompt,
        negativePrompt: params.negativePrompt || '',
        height: params.height || 768,
        width: params.width || 1344,
        model: params.model || 'runware:video@1',
        steps: params.steps || 25,
        CFGScale: params.CFGScale || 7.0,
        seed: params.seed,
        frames: params.frames || 24,
        fps: params.fps || 8,
      };

      const response = await this.axiosInstance.post('/inference', requestData);
      
      return {
        taskUUID: response.data.taskUUID,
        taskType: response.data.taskType,
        status: 'success',
        videoURL: response.data.videoURL,
        processingTime: response.data.processingTime,
      };
    } catch (error) {
      console.error('Error generating video:', error);
      throw this.handleError(error);
    }
  }

  // Get task status and result
  async getTaskStatus(taskUUID: string): Promise<RunwareResponse> {
    try {
      const response = await this.axiosInstance.get(`/tasks/${taskUUID}`);
      
      return {
        taskUUID: response.data.taskUUID,
        taskType: response.data.taskType,
        status: response.data.status,
        imageURL: response.data.imageURL,
        videoURL: response.data.videoURL,
        processingTime: response.data.processingTime,
      };
    } catch (error) {
      console.error('Error getting task status:', error);
      throw this.handleError(error);
    }
  }

  // List available models
  async getModels(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('/models');
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw this.handleError(error);
    }
  }

  // Remove image background
  async removeBackground(imageURL: string): Promise<RunwareResponse> {
    try {
      const requestData = {
        taskType: 'removeBackground',
        taskUUID: this.generateUUID(),
        inputImage: imageURL,
      };

      const response = await this.axiosInstance.post('/inference', requestData);
      
      return {
        taskUUID: response.data.taskUUID,
        taskType: response.data.taskType,
        status: 'success',
        imageURL: response.data.imageURL,
        processingTime: response.data.processingTime,
      };
    } catch (error) {
      console.error('Error removing background:', error);
      throw this.handleError(error);
    }
  }

  // Upscale image
  async upscaleImage(imageURL: string, scaleFactor: number = 2): Promise<RunwareResponse> {
    try {
      const requestData = {
        taskType: 'upscale',
        taskUUID: this.generateUUID(),
        inputImage: imageURL,
        scaleFactor,
      };

      const response = await this.axiosInstance.post('/inference', requestData);
      
      return {
        taskUUID: response.data.taskUUID,
        taskType: response.data.taskType,
        status: 'success',
        imageURL: response.data.imageURL,
        processingTime: response.data.processingTime,
      };
    } catch (error) {
      console.error('Error upscaling image:', error);
      throw this.handleError(error);
    }
  }

  // Generate UUID for tasks
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Error handler
  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.statusText || 'API Error';
      return new Error(`Runware API Error (${error.response.status}): ${message}`);
    } else if (error.request) {
      // Request made but no response received
      return new Error('No response from Runware API. Please check your connection.');
    } else {
      // Something else happened
      return new Error(`Request Error: ${error.message}`);
    }
  }

  // Validate API key by making a simple request
  async validateApiKey(): Promise<boolean> {
    try {
      // Test the API key with a simple request
      const testRequest = [{
        taskType: 'imageInference',
        taskUUID: this.generateUUID(),
        positivePrompt: 'test',
        width: 512,
        height: 512,
        model: 'runware:101@1', // FLUX.1 Dev model
        steps: 1,
        numberResults: 1,
        outputType: 'URL',
        deliveryMethod: 'sync'
      }];
      
      const response = await this.axiosInstance.post('', testRequest);
      
      // If we get a response without authentication errors, the key is valid
      return !response.data?.errors?.some((error: any) => 
        error.code === 'invalidApiKey' || error.message?.includes('API key')
      );
    } catch (error: any) {
      // Check if it's an authentication error
      if (error.response?.status === 401 || 
          error.response?.data?.errors?.some((e: any) => e.code === 'invalidApiKey')) {
        return false;
      }
      // For other errors, assume the key might be valid but there's another issue
      return true;
    }
  }
}

// Default export for easy usage
export const runwareAPI = new RunwareAPI();