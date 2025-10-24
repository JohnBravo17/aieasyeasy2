'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CodeBracketIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  RocketLaunchIcon,
  ClipboardDocumentIcon,
  UserIcon
} from '@heroicons/react/24/outline';

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

export default function DashboardPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');

  useEffect(() => {
    // Get user from cookie
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('github_user='));
    
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        setUser(userData);
        fetchRepos();
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const fetchRepos = async () => {
    try {
      const response = await fetch('/api/github/repos');
      if (response.ok) {
        const reposData = await response.json();
        setRepos(reposData);
      }
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  const createRepo = async () => {
    if (!newRepoName.trim()) return;
    
    setIsCreating(true);
    try {
      const response = await fetch('/api/github/repos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newRepoName,
          description: newRepoDescription,
          private: false,
        }),
      });

      if (response.ok) {
        const newRepo = await response.json();
        setRepos(prev => [newRepo, ...prev]);
        setNewRepoName('');
        setNewRepoDescription('');
      }
    } catch (error) {
      console.error('Error creating repo:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const deployToVercel = async (repo: GitHubRepo) => {
    try {
      const response = await fetch('/api/github/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: repo.full_name.split('/')[0],
          repo: repo.name,
        }),
      });

      if (response.ok) {
        alert('Deployment triggered successfully!');
      }
    } catch (error) {
      console.error('Error deploying:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-purple-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Not Authenticated</h1>
          <p className="text-gray-300 mb-8">Please connect your GitHub account to continue.</p>
          <Link
            href="/api/auth/github"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Connect GitHub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="h-12 w-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome, {user.name || user.login}
                </h1>
                <p className="text-gray-300">
                  Manage your GitHub repositories and deploy to Vercel
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">
                {user.public_repos}
              </div>
              <div className="text-sm text-gray-400">Public Repos</div>
            </div>
          </div>
        </motion.div>

        {/* Create New Repository */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <PlusIcon className="h-6 w-6 mr-2" />
            Create New Repository
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Repository name"
              value={newRepoName}
              onChange={(e) => setNewRepoName(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newRepoDescription}
              onChange={(e) => setNewRepoDescription(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <button
              onClick={createRepo}
              disabled={isCreating || !newRepoName.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center"
            >
              {isCreating ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Create
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-600/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <CodeBracketIcon className="h-6 w-6 text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white truncate">
                    {repo.name}
                  </h3>
                </div>
                {repo.private && (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    Private
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                {repo.language && (
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                    {repo.language}
                  </span>
                )}
                <span>
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex space-x-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-center py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                  View
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(repo.clone_url)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                  title="Copy clone URL"
                >
                  <ClipboardDocumentIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deployToVercel(repo)}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                  title="Deploy to Vercel"
                >
                  <RocketLaunchIcon className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <CodeBracketIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Repositories</h3>
            <p className="text-gray-400">Create your first repository to get started.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}