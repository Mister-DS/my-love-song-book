import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, Music, Send, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Souvenirs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameScore, setGameScore] = useState(0);
  const [hearts, setHearts] = useState<{id: number, x: number, y: number}[]>([]);
  const [displayedCompliments, setDisplayedCompliments] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSecretResponse, setShowSecretResponse] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [runAwayButton, setRunAwayButton] = useState({ x: 0, y: 0, isRunning: false });

  const compliments = [
    "Tes écarts de folies",
    "Ta manière de bouder",
    "Ton rire contagieux",
    "La douceur de tes câlins",
    "Ton intelligence et ta sagesse",
    "Ta passion pour l'amour",
    "la manière dont tu montres que je suis à toi",
    "Ta gentillesse", 
    "Tes magnifiques yeux bleus",
    "Tes cheveux d'or",
    "Ton visage si doux et parfait",
    "Ton corps si joli",
    "Tous tes petits défauts qui te rendent unique",
  ];

  const timeline = [
    { date: "Premier Message (Octobre 2023)", description: "Le moment où nos chemin se sont croisés" },
    { date: "Premier rendez-vous (Janvier 2024)", description: "Cette soirée magique ensemble" },
    { date: "Premier baiser (Janvier 2024)", description: "Le début de notre histoire" },
    { date: "Je t'aime (Février 2024)", description: "Ces trois petits mots qui ont tout changé" },
    { date: "Aujourd'hui", description: "Et tous les moments merveilleux à venir" },
    { date: "Pour toujours", description: "Je promets de toujours t'aimer et te chérir 💕" },
  ];

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

  const handleHeartClick = (heartId: number) => {
    setGameScore(prev => prev + 1);
    setHearts(prev => prev.filter(h => h.id !== heartId));
    
    if (gameScore + 1 === 10) {
      toast({
        title: "Bravo mon amour ! 💕",
        description: "Tu as capturé tous les cœurs comme tu as capturé le mien !",
        duration: 4000,
      });
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

  const handleYes = () => {
    toast({
      title: "Tu me rends si heureux ! 💕",
      description: "Je promets de faire encore plus d'efforts pour nous.",
      duration: 4000,
    });
  };

  const saveToDatabase = (type: string, content: string) => {
    // Placeholder pour Supabase - sera implémenté une fois connecté
    console.log(`Saving to database: ${type} - ${content}`);
    toast({
      title: "Message enregistré 👌",
      description: "Tes mots sont précieux pour moi !",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen starry-bg relative overflow-hidden">
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
                >
                  Oui 💕
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
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={spawnHeart} className="w-full">
                Faire apparaître un cœur
              </Button>
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
              >
                {showLetter ? "Fermer la lettre" : "Ouvrir la lettre"}
              </Button>
              {showLetter && (
                <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed">
                  <p className="font-romantic text-lg mb-2">Ma chérie,</p>
                  <p>Je sais que je ne suis pas toujours facile à vivre. Mon caractère peut parfois être difficile, et je m'en excuse sincèrement.</p>
                  <p className="mt-2">Mais sache que tu es la lumière de ma vie, et je veux devenir une meilleure version de moi-même pour nous deux.</p>
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
              />
              <Button 
                onClick={() => {
                  const message = (document.getElementById('livreDor') as HTMLTextAreaElement)?.value;
                  if (message) {
                    saveToDatabase('livre_dor', message);
                    (document.getElementById('livreDor') as HTMLTextAreaElement).value = '';
                  }
                }}
                className="w-full flex items-center gap-2"
              >
                <Send size={16} />
                Écrire un mot pour toi
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
              >
                {showSecretResponse ? "Cacher" : "Réponse secrète"}
              </Button>
              {showSecretResponse && (
                <>
                  <Textarea 
                    placeholder="Dis-moi ce que tu penses vraiment..."
                    className="resize-none"
                    id="reponseSecrete"
                  />
                  <Button 
                    onClick={() => {
                      const message = (document.getElementById('reponseSecrete') as HTMLTextAreaElement)?.value;
                      if (message) {
                        saveToDatabase('reponse_secrete', message);
                        (document.getElementById('reponseSecrete') as HTMLTextAreaElement).value = '';
                      }
                    }}
                    className="w-full"
                  >
                    Envoyer secrètement
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
              { text: "Bisou virtuel 💋", value: "bisou" }
            ].map(choice => (
              <Button
                key={choice.value}
                onClick={() => saveToDatabase('choix_tendre', choice.text)}
                variant="outline"
                className="px-6 py-3"
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
              { text: "Un resto 🍽", value: "resto" }
            ].map(choice => (
              <Button
                key={choice.value}
                onClick={() => saveToDatabase('sondage', choice.text)}
                className="btn-romantic text-white px-6 py-3"
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