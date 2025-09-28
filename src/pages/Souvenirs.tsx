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
  const [currentCompliment, setCurrentCompliment] = useState(0);
  const [showSecretResponse, setShowSecretResponse] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [runAwayButton, setRunAwayButton] = useState({ x: 0, y: 0, isRunning: false });

  const compliments = [
    "Tu illumines chaque journée de ma vie 🌟",
    "Ton sourire fait fondre mon cœur 💕",
    "Tu es la plus belle chose qui me soit arrivée 🦋",
    "Avec toi, je me sens complet 💖",
    "Tu es ma source d'inspiration quotidienne ✨"
  ];

  const timeline = [
    { date: "Premier regard", description: "Le moment où nos yeux se sont croisés 👀💕" },
    { date: "Premier rendez-vous", description: "Cette soirée magique ensemble 🌙✨" },
    { date: "Je t'aime", description: "Ces trois petits mots qui ont tout changé 💌" },
    { date: "Aujourd'hui", description: "Et tous les moments merveilleux à venir 💖" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCompliment((prev) => (prev + 1) % compliments.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    const newHeart = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50)
    };
    setHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 3000);
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
      title: "Message enregistré 💌",
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
        <Heart
          key={heart.id}
          className="absolute cursor-pointer text-primary animate-pulse-glow floating-heart z-10"
          style={{ left: heart.x, top: heart.y }}
          size={30}
          onClick={() => handleHeartClick(heart.id)}
          fill="currentColor"
        />
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
            💕 Nos Souvenirs 💕
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-2xl text-primary">
                Notre Histoire d'Amour 📖
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {timeline.map((moment, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
                  <div>
                    <h3 className="font-semibold text-primary">{moment.date}</h3>
                    <p className="text-muted-foreground">{moment.description}</p>
                  </div>
                </div>
              ))}
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
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-lg text-center font-medium text-primary typewriter">
                {compliments[currentCompliment]}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Section */}
        <Card className="mt-8 bg-card/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="font-romantic text-2xl text-primary text-center">
              Est-ce que tu veux toujours de moi ? 🥺
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button 
              onClick={handleYes}
              className="btn-romantic text-white px-8 py-3"
            >
              Oui 💕
            </Button>
            <Button 
              variant="outline"
              onClick={handleRunAwayNo}
              className={`transition-all duration-300 ${runAwayButton.isRunning ? 'opacity-50' : ''}`}
              style={runAwayButton.isRunning ? {
                position: 'fixed',
                left: runAwayButton.x,
                top: runAwayButton.y,
                zIndex: 50
              } : {}}
            >
              Non
            </Button>
          </CardContent>
        </Card>

        {/* Interactive sections */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Mini-jeu */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-xl text-primary">
                Jeu des Cœurs 💖
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
                Lettre d'Amour 💌
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
                Livre d'Or 📝
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
                Réponse Secrète 🤫
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
              Comment te sens-tu maintenant ? 💭
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4">
            {[
              { text: "Je te pardonne 💕", value: "pardonne" },
              { text: "Encore un effort 😅", value: "effort" },
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
              Qu'est-ce qui te ferait plaisir ? 💫
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4">
            {[
              { text: "Un câlin 🤗", value: "calin" },
              { text: "Une sortie 👫", value: "sortie" },
              { text: "Du silence 🌙", value: "silence" },
              { text: "Un resto 🍝", value: "resto" }
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