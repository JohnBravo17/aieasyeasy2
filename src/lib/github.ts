import axios from 'axios';

interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  public_repos: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  html_url: string;
  clone_url: string;
  updated_at: string;
  language: string;
}

export class GitHubAPI {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.GITHUB_CLIENT_ID || '';
    this.clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
    this.redirectUri = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  }

  // Generate GitHub OAuth URL
  getAuthURL(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${this.redirectUri}/api/auth/github/callback`,
      scope: 'repo user:email',
      response_type: 'code',
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  // Exchange code for access token
  async getAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get access token');
    }
  }

  // Get user information
  async getUser(accessToken: string): Promise<GitHubUser> {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw new Error('Failed to get user information');
    }
  }

  // Get user repositories
  async getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          sort: 'updated',
          per_page: 100,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error getting repositories:', error);
      throw new Error('Failed to get repositories');
    }
  }

  // Create a repository
  async createRepo(accessToken: string, repoData: { name: string; description?: string; private?: boolean }): Promise<GitHubRepo> {
    try {
      const response = await axios.post(
        'https://api.github.com/user/repos',
        repoData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating repository:', error);
      throw new Error('Failed to create repository');
    }
  }

  // Get repository contents
  async getRepoContents(accessToken: string, owner: string, repo: string, path: string = ''): Promise<any[]> {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      console.error('Error getting repository contents:', error);
      throw new Error('Failed to get repository contents');
    }
  }

  // Create or update a file in repository
  async createOrUpdateFile(
    accessToken: string,
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    sha?: string
  ): Promise<any> {
    try {
      const requestData: any = {
        message,
        content: Buffer.from(content).toString('base64'),
      };

      if (sha) {
        requestData.sha = sha;
      }

      const response = await axios.put(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating/updating file:', error);
      throw new Error('Failed to create/update file');
    }
  }

  // Deploy to Vercel (if repository is connected)
  async triggerVercelDeployment(accessToken: string, owner: string, repo: string): Promise<any> {
    try {
      // This would typically trigger a webhook or use Vercel's API
      // For now, we'll just create a deployment trigger file
      const deploymentContent = JSON.stringify({
        timestamp: new Date().toISOString(),
        trigger: 'manual',
        source: 'runware-clone',
      }, null, 2);

      return await this.createOrUpdateFile(
        accessToken,
        owner,
        repo,
        '.vercel/deployment-trigger.json',
        deploymentContent,
        'Trigger Vercel deployment'
      );
    } catch (error) {
      console.error('Error triggering deployment:', error);
      throw new Error('Failed to trigger deployment');
    }
  }
}

export const githubAPI = new GitHubAPI();