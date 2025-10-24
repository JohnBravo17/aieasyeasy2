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
    this.baseURL = process.env.RUNWARE_API_URL || 'https://api.runware.ai/v1';
    
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
      const requestData = {
        taskType: 'imageInference',
        taskUUID: params.taskUUID || this.generateUUID(),
        positivePrompt: params.positivePrompt,
        negativePrompt: params.negativePrompt || '',
        height: params.height || 1024,
        width: params.width || 1024,
        model: params.model || 'runware:100@1',
        steps: params.steps || 25,
        CFGScale: params.CFGScale || 7.0,
        seed: params.seed,
        numberResults: params.numberResults || 1,
        outputFormat: params.outputFormat || 'PNG',
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

  // Validate API key
  async validateApiKey(): Promise<boolean> {
    try {
      await this.axiosInstance.get('/auth/validate');
      return true;
    } catch {
      return false;
    }
  }
}

// Default export for easy usage
export const runwareAPI = new RunwareAPI();