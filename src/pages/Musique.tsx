import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Play, Pause, Heart, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Musique = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<string>("");
  const [audioFile, setAudioFile] = useState<string>("");
  const [lyricsIndex, setLyricsIndex] = useState(0);
  const [heartBeats, setHeartBeats] = useState<{id: number, x: number, y: number}[]>([]);

  const lyrics = [
    "🎵 Cette chanson me fait penser à toi... 🎵",
    "💕 À chaque note, je pense à ton sourire 💕",
    "🌟 Tu es la mélodie de ma vie 🌟",
    "💖 Ensemble, nous créons la plus belle symphonie 💖",
    "🦋 Dans tes bras, je trouve la paix 🦋",
    "✨ Tu es ma plus belle chanson d'amour ✨",
    "💌 Chaque battement de cœur résonne pour toi 💌",
    "🎶 Notre amour est une mélodie éternelle 🎶"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setLyricsIndex((prev) => (prev + 1) % lyrics.length);
        generateHeartBeat();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const generateHeartBeat = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50)
    };
    setHeartBeats(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHeartBeats(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      setCurrentSong(file.name);
      toast({
        title: "Chanson importée ! 🎵",
        description: `"${file.name}" est maintenant prête à être écoutée.`,
        duration: 3000,
      });
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const saveToDatabase = (type: string, content: string) => {
    // Placeholder pour Supabase - sera implémenté une fois connecté
    console.log(`Saving to database: ${type} - ${content}`);
    toast({
      title: "Chanson enregistrée ! 🎵",
      description: "Ta chanson pour moi est précieusement sauvegardée.",
      duration: 3000,
    });
  };

  const handleSongForMe = () => {
    if (currentSong) {
      saveToDatabase('chanson', currentSong);
      toast({
        title: "Ta chanson pour moi 💕",
        description: "Merci pour cette belle mélodie d'amour !",
        duration: 4000,
      });
    } else {
      toast({
        title: "Aucune chanson sélectionnée",
        description: "Importe d'abord une chanson pour la partager !",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen starry-bg relative overflow-hidden">
      {/* Animated hearts */}
      {heartBeats.map(heart => (
        <Heart
          key={heart.id}
          className="absolute text-primary animate-float-heart pointer-events-none z-10"
          style={{ left: heart.x, top: heart.y }}
          size={24}
          fill="currentColor"
        />
      ))}

      {/* Equalizer visualization */}
      <div className="absolute top-1/4 left-10 flex items-end gap-1 z-10">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`w-2 bg-primary rounded-t ${isPlaying ? 'animate-pulse' : ''}`}
            style={{
              height: isPlaying ? `${Math.random() * 40 + 20}px` : '20px',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/souvenirs")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Retour aux souvenirs
          </Button>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🎵 Notre Musique 🎵
          </Badge>
        </div>

        {/* Main title */}
        <div className="text-center mb-12">
          <h1 className="font-romantic text-4xl text-primary mb-4">
            Cette chanson me fait penser à toi... 💕
          </h1>
          <p className="text-lg text-muted-foreground">
            Partage une mélodie qui résonne avec notre amour
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Import section */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-2xl text-primary flex items-center gap-2">
                <Music className="animate-float-heart" />
                Importer une chanson
              </CardTitle>
              <CardDescription>
                Choisis une chanson depuis ton appareil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 w-full"
                  variant="outline"
                >
                  <Upload size={16} />
                  Choisir un fichier audio
                </Button>
              </div>
              
              {currentSong && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-primary">Chanson sélectionnée:</p>
                  <p className="text-sm text-muted-foreground truncate">{currentSong}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lyrics scrolling */}
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-2xl text-primary">
                Paroles d'Amour 💌
              </CardTitle>
              <CardDescription>
                Les mots qui dansent au rythme de notre cœur
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-lg text-center font-medium text-primary typewriter">
                {lyrics[lyricsIndex]}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Audio player */}
        {audioFile && (
          <Card className="mt-8 bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-romantic text-2xl text-primary text-center">
                🎵 Lecteur Audio 🎵
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <audio
                ref={audioRef}
                src={audioFile}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
              
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={togglePlayPause}
                  className="btn-romantic text-white px-8 py-3 flex items-center gap-2"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                
                <Button 
                  onClick={handleSongForMe}
                  variant="outline"
                  className="px-8 py-3 flex items-center gap-2"
                >
                  <Heart size={20} />
                  Ajouter pour moi
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Romantic message */}
        <Card className="mt-8 bg-card/90 backdrop-blur-sm shadow-lg">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="font-romantic text-2xl text-primary">
                La musique de notre amour 🎶
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Chaque note que nous partageons renforce le lien qui nous unit. 
                Cette mélodie sera pour toujours associée à toi, à nous, 
                à ce moment où nous avons choisi de nous réconcilier. 💕
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Heart key={i} className="text-primary animate-float-heart" fill="currentColor" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => navigate("/")}
            className="btn-romantic text-white px-8 py-4 text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Musique;