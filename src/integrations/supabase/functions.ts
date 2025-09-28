import { supabase } from './client';
import type { Database } from './types';

// Types pour une meilleure lisibilité
export type Message = Database['public']['Tables']['messages']['Row'];
export type HeartScore = Database['public']['Tables']['heart_scores']['Row'];
export type Song = Database['public']['Tables']['songs']['Row'];

/**
 * Enregistre un message dans la base de données
 * @param type Type du message (livre_dor, reponse_secrete, choix_tendre, sondage)
 * @param content Contenu du message
 * @returns true si le message a été enregistré avec succès, false sinon
 */
export const saveMessage = async (type: string, content: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('messages')
      .insert([{ type, content }]);

    if (error) {
      console.error('Erreur lors de l\'enregistrement du message:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du message:', error);
    return false;
  }
};

/**
 * Enregistre un score pour le jeu des coeurs
 * @param score Score à enregistrer
 * @returns true si le score a été enregistré avec succès, false sinon
 */
export const saveHeartScore = async (score: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('heart_scores')
      .insert([{ score }]);

    if (error) {
      console.error('Erreur lors de l\'enregistrement du score:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du score:', error);
    return false;
  }
};

/**
 * Récupère les messages récents d'un type donné
 * @param type Type de message à récupérer
 * @param limit Nombre maximal de messages à récupérer (par défaut 5)
 * @returns Un tableau de messages
 */
export const getRecentMessages = async (type: string, limit: number = 5): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return [];
  }
};

/**
 * Récupère le score le plus élevé pour le jeu des coeurs
 * @returns Le score le plus élevé, ou 0 s'il n'y a pas de score enregistré
 */
export const getHighestHeartScore = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('heart_scores')
      .select('score')
      .order('score', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return 0;
    }

    return data[0].score;
  } catch (error) {
    console.error('Erreur lors de la récupération du meilleur score:', error);
    return 0;
  }
};

/**
 * Récupère les chansons enregistrées
 * @returns Un tableau de chansons
 */
export const getSongs = async (): Promise<Song[]> => {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des chansons:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des chansons:', error);
    return [];
  }
};

/**
 * Ajoute une chanson à la base de données
 * @param title Titre de la chanson
 * @param file_name Nom du fichier de la chanson
 * @returns true si la chanson a été ajoutée avec succès, false sinon
 */
export const addSong = async (title: string, file_name: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('songs')
      .insert([{ title, file_name }]);

    if (error) {
      console.error('Erreur lors de l\'ajout de la chanson:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la chanson:', error);
    return false;
  }
};

/**
 * Récupère toutes les statistiques des messages
 * @returns Un tableau de statistiques de messages
 */
export const getMessageStats = async () => {
  try {
    const { data, error } = await supabase
      .from('message_stats')
      .select('*');

    if (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return [];
  }
};

/**
 * Récupère les meilleurs scores
 * @param limit Nombre maximal de scores à récupérer (par défaut 10)
 * @returns Un tableau des meilleurs scores
 */
export const getTopHeartScores = async (limit: number = 10) => {
  try {
    const { data, error } = await supabase
      .from('top_heart_scores')
      .select('*')
      .limit(limit);

    if (error) {
      console.error('Erreur lors de la récupération des meilleurs scores:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des meilleurs scores:', error);
    return [];
  }
};