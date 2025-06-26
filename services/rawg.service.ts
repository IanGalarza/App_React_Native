import { Game, RAWGResponse } from '../types/rawg.types';

const API_BASE_URL = 'https://api.rawg.io/api';
const API_KEY = 'be157d3e734b4d8bb1b45a4853b96a58'; 

const buildUrl = (endpoint: string, params: Record<string, string | number> = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append('key', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

export const getGames = async (page = 1, pageSize = 10): Promise<RAWGResponse> => {
  const url = buildUrl('/games', { page, page_size: pageSize });
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching games: ${response.statusText}`);
  }

  return await response.json();
};

export const getGameDetails = async (gameId: number): Promise<Game> => {
  const url = buildUrl(`/games/${gameId}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching game details: ${response.statusText}`);
  }

  return await response.json();
};
