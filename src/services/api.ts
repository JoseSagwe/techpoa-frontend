// src/services/api.ts

export interface NewsletterSubscriber {
    email: string;
  }
  
  export interface QuoteRequest {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    description: string;
  }
  
  export interface LaunchConfig {
    launchDate: string;
  }
  
  const API_BASE_URL = 'https://api.techpoa.com/api';
  
  // Newsletter subscription
  export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return { success: false, message: 'Failed to subscribe. Please try again later.' };
    }
  };
  
  // Quote request submission
  export const submitQuoteRequest = async (quoteData: QuoteRequest): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting quote request:', error);
      return { success: false, message: 'Failed to submit quote request. Please try again later.' };
    }
  };


export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const submitContactMessage = async (contactData: ContactMessage): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return { success: false, message: 'Failed to send message. Please try again later.' };
  }
};