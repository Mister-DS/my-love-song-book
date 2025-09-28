import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import couplePhoto from "@/assets/couple-image.jpg";
import StarryBackground from "@/components/StarryBackground";

const Index = () => {
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState("");
  const [showPoem, setShowPoem] = useState(false);

  const excuseMessage = "Ma princesse, je sais que je ne suis pas toujours facile à vivre. Mon caractère peut parfois être difficile, et je m'en excuse sincèrement du fond de mon cœur...";
  
  const qualities = [
    "Ta patience infinie avec moi",
    "Ton sourire qui illumine mes journées",
    "Ta douceur qui apaise mon âme", 
    "Ton intelligence qui me fascine",
    "Ta beauté intérieure et extérieure",
    "Ton cœur généreux et aimant",
    "Ton coeur qui pardonne mes erreurs",
    "Ton soutien inébranlable",
    "Ton rire qui réchauffe mon cœur",
    "Ta créativité sans limite",
    "Ton optimisme contagieux",
    "Ta force dans les moments difficiles",
    "Ton amour inconditionnel",
    "Ta capacité à me comprendre sans mots",
    "Ton esprit aventureux",
    "Ta fidélité et loyauté",
    "Ton sens de l'humour qui me fait rire",
    "Ta tendresse qui me réconforte",
    "Ton authenticité qui me touche profondément",
    "Ton énergie positive qui m'inspire"
  ];

  const poem = `Dans le silence de la nuit étoilée,
  Descend des étoiles, la plus douce des pensées.
  C'est toi, qui me tends la main,
  A toi celle qui me montre le chemin.
  A toi qui sais pardonner mes erreurs,
  A toi qui sèches mes larmes, apaise mes peurs.
  Ton sourire est un rayon de soleil,
  Toutes pensées sombres s'envolent, s'émerveillent.
  Ton rire est une mélodie enchantée,
  Qui fait danser mon cœur, le fait vibrer.
  Ta voix est une douce caresse,
  Qui réchauffe mon âme, apaise ma détresse.
  Tes yeux sont des étoiles brillantes,
  Qui illuminent mes nuits, me rendent vivant.
  Toi princesse au cheveaux d'or,
  a qui on a donné tellement de remords.
  Mais a qui je ferrai tout pour être meilleur.
  Même si je dois finir par défier la mort... 
  Je t'aime plus que tout au monde,
  J'espère que notre amour jamais ne s'effondre.`;

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
    <StarryBackground>
      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="text-xl px-6 py-3 mb-6">
            Une Lettre d'Amour pour Toi 👌
          </Badge>
          <h1 className="font-romantic text-5xl md:text-6xl text-primary mb-4 animate-float-heart">
            Ma Chérie... 💕
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Photo de couple - CORRIGÉ */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="relative mx-auto max-w-[280px]">
                <div className="aspect-square w-full mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
                  <img 
                    src={couplePhoto}
                    alt="Notre photo ensemble"
                    className="w-full h-full object-cover object-center"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => console.error("Erreur de chargement de l'image:", e)}
                  />
                </div>
                <div className="absolute -top-2 -right-2 text-3xl animate-pulse-glow">💕</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-float-heart">✨</div>
              </div>
              <p className="mt-4 font-romantic text-xl text-primary">
                Nous deux, pour toujours
              </p>
            </CardContent>
          </Card>

          {/* Message d'excuse avec effet machine à écrire */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-3xl text-primary text-center">
                Mes Excuses Sincères
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
                Ma Promesse 🤞
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                <p className="text-xl font-semibold text-primary mb-4">
                  Je m'engage solennellement à :
                </p>
                <ul className="space-y-2 text-lg">
                  <li>Travailler sur mon caractère chaque jour</li>
                  <li>Mieux communiquer avec toi</li>
                  <li>T'écouter avec plus d'attention</li>
                  <li>Te montrer à quel point tu comptes pour moi</li>
                  <li>Devenir l'homme que tu mérites</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Poème */}
          {showPoem && (
            <Card className="bg-card/90 backdrop-blur-sm shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="font-romantic text-3xl text-primary text-center">
                  Un Poème pour Toi 📝
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
                  Simon 👌
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
    </StarryBackground>
  );
};

export default Index;