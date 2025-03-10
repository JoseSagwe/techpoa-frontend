// src/services/admin-api.ts
import { NewsletterSubscriber as BaseSubscriber, QuoteRequest as BaseQuoteRequest } from './api';

// Extended interfaces for admin use
export interface NewsletterSubscriber extends BaseSubscriber {
  id?: number;
  subscribedAt?: string;
}

export interface QuoteRequest extends BaseQuoteRequest {
  id?: number;
  createdAt?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface DashboardStats {
  subscriberCount: number;
  quoteCount: number;
  messageCount: number;
}

const API_BASE_URL = 'https://api.techpoa.com/api/admin';

// Access code verification
export const verifyAccessCode = async (accessCode: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessCode }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying access code:', error);
    return { success: false, message: 'Failed to verify access code. Please try again.' };
  }
};

// Get dashboard statistics
export const getDashboardStats = async (accessCode: string): Promise<DashboardStats | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard-stats?accessCode=${accessCode}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};

// Get newsletter subscribers
export const getSubscribers = async (accessCode: string): Promise<NewsletterSubscriber[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers?accessCode=${accessCode}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscribers');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }
};

// Get quote requests
export const getQuoteRequests = async (accessCode: string): Promise<QuoteRequest[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes?accessCode=${accessCode}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote requests');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quote requests:', error);
    return [];
  }
};

// Get contact messages
export const getContactMessages = async (accessCode: string): Promise<ContactMessage[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-messages?accessCode=${accessCode}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch contact messages');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
};