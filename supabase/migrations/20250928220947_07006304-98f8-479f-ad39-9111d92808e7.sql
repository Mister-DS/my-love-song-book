-- Création de la table pour tous les messages et interactions
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'livre_dor', 'reponse_secrete', 'choix_tendre', 'sondage', etc.
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Création d'une table séparée pour les scores du jeu des coeurs
CREATE TABLE public.heart_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ajout de la colonne updated_at à la table songs si elle n'existe pas déjà
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'updated_at') THEN
    ALTER TABLE public.songs ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
  END IF;
END $$;

-- Création d'une vue pour faciliter l'analyse des données
CREATE VIEW public.message_stats AS
SELECT 
  type,
  COUNT(*) as total_count,
  MAX(created_at) as last_interaction
FROM public.messages
GROUP BY type;

-- Création d'une vue pour les meilleurs scores
CREATE VIEW public.top_heart_scores AS
SELECT 
  score,
  created_at
FROM public.heart_scores
ORDER BY score DESC
LIMIT 10;

-- Trigger pour mettre à jour le champ updated_at sur les tables
CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_heart_scores_updated_at
BEFORE UPDATE ON public.heart_scores
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Politique de sécurité pour la table messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view messages"
ON public.messages
FOR SELECT
USING (true);
CREATE POLICY "Anyone can add messages"
ON public.messages
FOR INSERT
WITH CHECK (true);

-- Politique de sécurité pour la table heart_scores
ALTER TABLE public.heart_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view heart scores"
ON public.heart_scores
FOR SELECT
USING (true);
CREATE POLICY "Anyone can add heart scores"
ON public.heart_scores
FOR INSERT
WITH CHECK (true);