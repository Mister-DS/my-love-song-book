import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, Music, Send, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveMessage, saveHeartScore, getHighestHeartScore } from "@/integrations/supabase/functions";

// Ajout d'un style global pour garantir que les cœurs soient toujours cliquables
const floatingHeartStyle = `
.floating-heart {
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.7));
  transition: transform 0.2s ease;
}

.floating-heart:hover {
  transform: scale(1.3);
  filter: drop-shadow(0 0 10px rgba(255, 105, 180, 1));
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
`;

const Souvenirs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameScore, setGameScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [hearts, setHearts] = useState<{id: number, x: number, y: number}[]>([]);
  const [displayedCompliments, setDisplayedCompliments] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSecretResponse, setShowSecretResponse] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [runAwayButton, setRunAwayButton] = useState({ x: 0, y: 0, isRunning: false });
  const [isLoading, setIsLoading] = useState(false);

  const compliments = [
    "Tu illumines chaque journée de ma vie",
    "Ton sourire fait fondre mon cœur",
    "Tu es la plus belle chose qui me soit arrivée",
    "Avec toi, je me sens complet",
    "Tu es ma source d'inspiration quotidienne"
  ];

  const timeline = [
    { date: "Premier regard", description: "Le moment où nos yeux se sont croisés" },
    { date: "Premier rendez-vous", description: "Cette soirée magique ensemble" },
    { date: "Je t'aime", description: "Ces trois petits mots qui ont tout changé" },
    { date: "Aujourd'hui", description: "Et tous les moments merveilleux à venir" }
  ];

  // Charger le meilleur score au démarrage
  useEffect(() => {
    const loadHighestScore = async () => {
      try {
        const score = await getHighestHeartScore();
        setHighestScore(score);
      } catch (error) {
        console.error("Erreur lors du chargement du meilleur score:", error);
      }
    };

    loadHighestScore();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < compliments.length) {
        // Ajouter un nouveau compliment à la liste
        setDisplayedCompliments(prev => [...prev, compliments[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Réinitialiser pour recommencer le cycle
        setDisplayedCompliments([]);
        setCurrentIndex(0);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleHeartClick = async (heartId: number) => {
    console.log("Cœur cliqué:", heartId);
    const newScore = gameScore + 1;
    setGameScore(newScore);
    setHearts(prev => prev.filter(h => h.id !== heartId));
    
    if (newScore >= 10) {
      setIsLoading(true);
      try {
        // Enregistrer le score dans Supabase
        await saveHeartScore(newScore);
        
        // Mettre à jour le score le plus élevé si nécessaire
        if (newScore > highestScore) {
          setHighestScore(newScore);
        }
        
        toast({
          title: "Bravo mon amour ! 💕",
          description: "Tu as capturé tous les cœurs comme tu as capturé le mien !",
          duration: 4000,
        });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du score:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'enregistrer ton score. Mais tu restes toujours gagnante dans mon cœur !",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
        // Réinitialiser le score après avoir atteint l'objectif
        setTimeout(() => {
          setGameScore(0);
        }, 2000);
      }
    }
  };

  const spawnHeart = () => {
    // Obtenir les dimensions du conteneur principal plutôt que de la fenêtre entière
    const container = document.querySelector('.container');
    const containerRect = container?.getBoundingClientRect();
    
    // Valeurs par défaut si le conteneur n'est pas disponible
    const containerWidth = containerRect?.width || window.innerWidth;
    const containerHeight = containerRect?.height || window.innerHeight;
    
    const newHeart = {
      id: Date.now(),
      x: Math.random() * (containerWidth - 50),
      y: Math.random() * (containerHeight - 50)
    };
    setHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 5000); // Augmenter le temps à 5 secondes pour donner plus de temps pour cliquer
  };

  const handleRunAwayNo = () => {
    const newX = Math.random() * (window.innerWidth - 100);
    const newY = Math.random() * (window.innerHeight - 100);
    setRunAwayButton({ x: newX, y: newY, isRunning: true });
    
    setTimeout(() => {
      setRunAwayButton(prev => ({ ...prev, isRunning: false }));
    }, 2000);
  };

  const handleYes = async () => {
    setIsLoading(true);
    try {
      await saveMessage('reponse_question', 'Oui, je veux toujours de toi');
      
      toast({
        title: "Tu me rends si heureux ! 💕",
        description: "Je promets de faire encore plus d'efforts pour nous.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la réponse:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite, mais ton 'Oui' reste gravé dans mon cœur !",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToDatabase = async (type: string, content: string) => {
    setIsLoading(true);
    try {
      const success = await saveMessage(type, content);
      
      if (success) {
        toast({
          title: "Message enregistré 👌",
          description: "Tes mots sont précieux pour moi !",
          duration: 3000,
        });
        
        // Réinitialiser les champs de texte
        if (type === 'livre_dor') {
          (document.getElementById('livreDor') as HTMLTextAreaElement).value = '';
        } else if (type === 'reponse_secrete') {
          (document.getElementById('reponseSecrete') as HTMLTextAreaElement).value = '';
        }
      } else {
        toast({
          title: "Erreur",
          description: "Impossible d'enregistrer ton message. Réessaie plus tard.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Réessaie plus tard.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen starry-bg relative overflow-hidden">
      {/* Style global pour les animations de cœurs */}
      <style>{floatingHeartStyle}</style>
      
      {/* Shooting stars */}
      <div className="shooting-star" style={{ top: "10%", left: "0%" }}></div>
      
      {/* Game hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute z-50 cursor-pointer"
          style={{ 
            left: `${heart.x}px`, 
            top: `${heart.y}px`,
            pointerEvents: 'auto'
          }}
        >
          <Heart
            className="text-primary animate-pulse-glow floating-heart"
            size={40} // Augmenter la taille pour faciliter le clic
            onClick={() => handleHeartClick(heart.id)}
            fill="currentColor"
          />
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Nos Souvenirs 💕
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-2xl text-primary">
                Notre Histoire d'Amour
              </CardTitle>
              <CardDescription>
                Les étapes de notre relation
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary"></div>
              
              <div className="space-y-8 relative">
                {timeline.map((moment, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="relative z-10 w-4 h-4 bg-primary rounded-full ring-4 ring-background shadow-lg"></div>
                    <div className="flex-1 pb-8">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h3 className="font-semibold text-primary text-lg">{moment.date}</h3>
                        <p className="text-muted-foreground mt-1">{moment.description}</p>
                        {index === timeline.length - 1 && (
                          <div className="mt-2 flex space-x-1">
                            <Heart className="w-4 h-4 text-primary animate-float-heart" fill="currentColor" />
                            <Heart className="w-4 h-4 text-primary animate-float-heart" fill="currentColor" style={{ animationDelay: "0.5s" }} />
                            <Heart className="w-4 h-4 text-primary animate-float-heart" fill="currentColor" style={{ animationDelay: "1s" }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliments défilants */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-2xl text-primary flex items-center gap-2">
                <Star className="animate-float-heart" />
                Ce que j'aime chez toi
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-lg text-center font-medium space-y-3">
                {displayedCompliments.map((compliment, index) => (
                  <p key={index} className="text-primary typewriter">
                    {compliment}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Section */}
        <Card className="mt-8 bg-card/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="font-romantic text-2xl text-primary text-center">
              Est-ce que tu veux toujours de moi ?
            </CardTitle>
            <CardDescription className="text-center">
              Une question importante... Essaie de cliquer sur "Non" 😉
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative h-80 w-full max-w-2xl mx-auto border-2 border-dashed border-primary/30 rounded-lg overflow-hidden bg-muted/10">
              <div className="absolute inset-8 flex justify-center items-center gap-8">
                <Button 
                  onClick={handleYes}
                  className="btn-romantic text-white px-8 py-3 z-10"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enregistrement...' : 'Oui 💕'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRunAwayNo}
                  className={`transition-all duration-300 px-8 py-3 ${runAwayButton.isRunning ? 'opacity-50' : ''}`}
                  style={runAwayButton.isRunning ? {
                    position: 'absolute',
                    left: Math.max(0, Math.min(runAwayButton.x, window.innerWidth - 100)),
                    top: Math.max(0, Math.min(runAwayButton.y, window.innerHeight - 50)),
                    zIndex: 50
                  } : {}}
                  disabled={isLoading}
                >
                  Non
                </Button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground animate-pulse">
                Le bouton "Non" a peur de toi ! 
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive sections */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Mini-jeu */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-xl text-primary">
                Jeu des Cœurs
              </CardTitle>
              <CardDescription>
                Clique sur les cœurs qui apparaissent ! Score: {gameScore}/10
                {highestScore > 0 && ` (Meilleur score: ${highestScore})`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={spawnHeart} 
                className="w-full bg-primary hover:bg-primary/80 text-white"
                disabled={isLoading}
              >
                Faire apparaître un cœur
              </Button>
              {gameScore > 0 && (
                <p className="text-center mt-4 text-primary font-bold">
                  Score: {gameScore}/10
                </p>
              )}
            </CardContent>
          </Card>

          {/* Lettre interactive */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-xl text-primary">
                Lettre d'Amour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowLetter(!showLetter)}
                variant="outline"
                className="w-full mb-4"
                disabled={isLoading}
              >
                {showLetter ? "Fermer la lettre" : "Ouvrir la lettre"}
              </Button>
              {showLetter && (
                <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed">
                  <p className="font-romantic text-lg mb-2">Ma princesse,</p>
                  <p>Je sais que je ne suis pas toujours facile à vivre. Mon caractère peut parfois être difficile, et je m'en excuse sincèrement.</p>
                  <p className="mt-2">Mais sache que tu es la lumière de ma vie, et je veux devenir une meilleure version de moi-même pour nous deux.</p>
                  <p className="mt-2">Dans ma vie je n'ai jamais eu vraiment de relation donc je veux tout faire pour conserver la seule, la nôtre...</p>
                  <p className="mt-2">Je sais que je suis pas hyper doué voir pas dutout... mais je t'aime d'un amour sincère.</p>
                  <p className="mt-2 font-romantic">Avec tout mon amour, Simon 💕</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Interactions avec sauvegarde */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Livre d'or */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-xl text-primary">
                Livre d'Or
              </CardTitle>
              <CardDescription>
                Écris-moi quelque chose...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Tes mots pour moi..."
                className="resize-none"
                id="livreDor"
                disabled={isLoading}
              />
              <Button 
                onClick={() => {
                  const message = (document.getElementById('livreDor') as HTMLTextAreaElement)?.value;
                  if (message) {
                    handleSaveToDatabase('livre_dor', message);
                  }
                }}
                className="w-full flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Écrire un mot pour toi
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Réponse secrète */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-xl text-primary">
                Réponse Secrète
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => setShowSecretResponse(!showSecretResponse)}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {showSecretResponse ? "Cacher" : "Réponse secrète"}
              </Button>
              {showSecretResponse && (
                <>
                  <Textarea 
                    placeholder="Dis-moi ce que tu penses vraiment..."
                    className="resize-none"
                    id="reponseSecrete"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={() => {
                      const message = (document.getElementById('reponseSecrete') as HTMLTextAreaElement)?.value;
                      if (message) {
                        handleSaveToDatabase('reponse_secrete', message);
                      }
                    }}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enregistrement...' : 'Envoyer secrètement'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Choix multiples tendres */}
        <Card className="mt-8 bg-card/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="font-romantic text-xl text-primary text-center">
              Comment te sens-tu maintenant ?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4">
            {[
              { text: "Je te pardonne 💕", value: "pardonne" },
              { text: "Encore un effort", value: "effort" },
              { text: "Bisou virtuel 💋", value: "bisou" },
              { text: "Je t'aime plus fort ❤️", value: "aime" },
              { text: "Je ne suis pas bien 😔", value: "pas_bien" },
              { text: "Je me sens seule 😢", value: "seule" },
              { text: "j'ai besoin de soutien 🤗", value: "soutien" },
            ].map(choice => (
              <Button
                key={choice.value}
                onClick={() => handleSaveToDatabase('choix_tendre', choice.text)}
                variant="outline"
                className="px-6 py-3"
                disabled={isLoading}
              >
                {choice.text}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Mini-sondage */}
        <Card className="mt-8 bg-card/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="font-romantic text-xl text-primary text-center">
              Qu'est-ce qui te ferait plaisir ?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4">
            {[
              { text: "Un câlin 🤗", value: "calin" },
              { text: "Une sortie 💫", value: "sortie" },
              { text: "Du silence 🌙", value: "silence" },
              { text: "Un resto 🍽", value: "resto" },
              { text: "Des fleurs 🌹", value: "fleurs" },
              { text: "Un massage 💆‍♀️", value: "massage" },
              { text: "Des surprises 🎁", value: "surprises" },
              { text: "Juste toi ❤️", value: "toi" },
            ].map(choice => (
              <Button
                key={choice.value}
                onClick={() => handleSaveToDatabase('sondage', choice.text)}
                className="btn-romantic text-white px-6 py-3"
                disabled={isLoading}
              >
                {choice.text}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => navigate("/musique")}
            className="btn-romantic text-white px-8 py-4 text-lg flex items-center gap-2"
          >
            <Music size={20} />
            Page Musique
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Souvenirs;