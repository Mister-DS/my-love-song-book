import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import couplePhoto from "@/assets/couple-photo.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState("");
  const [showPoem, setShowPoem] = useState(false);

  const excuseMessage = "Ma chérie, je sais que je ne suis pas toujours facile à vivre. Mon caractère peut parfois être difficile, et je m'en excuse sincèrement du fond de mon cœur...";
  
  const qualities = [
    "Ta patience infinie avec moi 💫",
    "Ton sourire qui illumine mes journées 🌟",
    "Ta douceur qui apaise mon âme 🦋", 
    "Ton intelligence qui me fascine ✨",
    "Ta beauté intérieure et extérieure 💎",
    "Ton cœur généreux et aimant 💖"
  ];

  const poem = `Dans le silence de mes regrets,
Résonne l'écho de tes "je t'aime"
Tu es ma lumière, mon secret
La plus belle de tous mes poèmes

Pardonne-moi mes moments d'ombre
Où mon caractère prend le dessus
Tu mérites bien mieux que ces sombres
Instants où je ne suis plus moi

Avec toi, je veux devenir meilleur
Cultiver la patience et la tendresse
Tu es le battement de mon cœur
Ma plus précieuse promesse`;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < excuseMessage.length) {
        setTypewriterText(excuseMessage.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowPoem(true), 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen starry-bg relative overflow-hidden">
      {/* Shooting stars */}
      <div className="shooting-star" style={{ top: "20%", left: "0%" }}></div>
      <div className="shooting-star" style={{ top: "60%", left: "0%", animationDelay: "5s" }}></div>
      
      {/* Floating hearts */}
      <Heart className="absolute top-1/4 right-10 text-primary animate-float-heart z-10" fill="currentColor" size={20} />
      <Heart className="absolute top-3/4 left-16 text-secondary animate-float-heart z-10" fill="currentColor" size={16} style={{ animationDelay: "1s" }} />
      <Star className="absolute top-1/3 left-1/4 text-accent animate-float-heart z-10" fill="currentColor" size={18} style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="text-xl px-6 py-3 mb-6">
            💌 Une Lettre d'Amour pour Toi 💌
          </Badge>
          <h1 className="font-romantic text-5xl md:text-6xl text-primary mb-4 animate-float-heart">
            Ma Chérie... 💕
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Photo de couple */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="relative inline-block">
                <img 
                  src={couplePhoto}
                  alt="Notre photo ensemble"
                  className="rounded-full w-48 h-48 md:w-64 md:h-64 mx-auto object-cover shadow-lg border-4 border-primary/30"
                />
                <div className="absolute -top-2 -right-2 text-3xl animate-pulse-glow">💕</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-float-heart">✨</div>
              </div>
              <p className="mt-4 font-romantic text-xl text-primary">
                Nous deux, pour toujours 💖
              </p>
            </CardContent>
          </Card>

          {/* Message d'excuse avec effet machine à écrire */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-3xl text-primary text-center">
                Mes Excuses Sincères 💔
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg leading-relaxed text-foreground min-h-[100px]">
                {typewriterText}
                <span className="animate-blink-caret">|</span>
              </p>
            </CardContent>
          </Card>

          {/* Ce que tu représentes pour moi */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-3xl text-primary text-center flex items-center justify-center gap-2">
                <Star className="animate-float-heart" fill="currentColor" />
                Ce que tu représentes pour moi
                <Star className="animate-float-heart" fill="currentColor" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {qualities.map((quality, index) => (
                  <div 
                    key={index}
                    className="bg-muted/30 p-4 rounded-lg text-center transition-all hover:bg-muted/50 hover:scale-105"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <p className="text-lg font-medium text-primary">{quality}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ma promesse */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="font-romantic text-3xl text-primary text-center">
                Ma Promesse 🤝💖
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                <p className="text-xl font-semibold text-primary mb-4">
                  Je m'engage solennellement à :
                </p>
                <ul className="space-y-2 text-lg">
                  <li>🌱 Travailler sur mon caractère chaque jour</li>
                  <li>💬 Mieux communiquer avec toi</li>
                  <li>👂 T'écouter avec plus d'attention</li>
                  <li>💝 Te montrer à quel point tu comptes pour moi</li>
                  <li>🌟 Devenir l'homme que tu mérites</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Poème */}
          {showPoem && (
            <Card className="bg-card/90 backdrop-blur-sm shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="font-romantic text-3xl text-primary text-center">
                  Un Poème pour Toi 📝💕
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="max-w-md mx-auto bg-muted/20 p-8 rounded-lg border-l-4 border-primary">
                  <pre className="font-romantic text-lg leading-relaxed text-primary whitespace-pre-wrap">
                    {poem}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Signature */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <Heart 
                      key={i} 
                      className="text-primary animate-float-heart" 
                      fill="currentColor"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
                <p className="font-romantic text-2xl text-primary">
                  Avec tout mon amour,
                </p>
                <p className="font-romantic text-3xl text-primary font-bold">
                  Simon 💌
                </p>
                <div className="flex justify-center space-x-1 mt-4">
                  <span className="text-2xl animate-pulse-glow">✨</span>
                  <span className="text-2xl animate-float-heart">💕</span>
                  <span className="text-2xl animate-pulse-glow">✨</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bouton navigation */}
          <div className="text-center pt-8">
            <Button 
              onClick={() => navigate("/souvenirs")}
              className="btn-romantic text-white px-8 py-4 text-xl font-medium flex items-center gap-2 mx-auto"
            >
              Voir nos souvenirs
              <ArrowRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
