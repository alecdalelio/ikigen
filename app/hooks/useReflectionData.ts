"use client";

import { useState, useEffect } from 'react';
import { ReflectionData } from '../types/reflection';

const STORAGE_KEY = 'ikigen-reflection-data';

const initialData: ReflectionData = {
  love: '',
  goodAt: '',
  worldNeeds: '',
  paidFor: ''
};

export function useReflectionData() {
  const [data, setData] = useState<ReflectionData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData({ ...initialData, ...parsed });
      }
    } catch (error) {
      console.error('Error loading reflection data:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  const updateData = (key: keyof ReflectionData, value: string) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving reflection data:', error);
    }
  };

  const clearData = () => {
    setData(initialData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing reflection data:', error);
    }
  };

  return {
    data,
    updateData,
    clearData,
    isLoaded
  };
} 