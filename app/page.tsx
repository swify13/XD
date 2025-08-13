"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Zap,
  Shield,
  Trophy,
  Copy,
  CheckCircle,
  Play,
  Star,
  Globe,
  Heart,
  Gamepad2,
  Crown,
  FileText,
  ShoppingCart,
  AlertTriangle,
  Gift,
  Key,
  Ban,
  LogOut,
  Activity,
  Settings,
  RefreshCw,
  Save,
  Database,
  MessageCircle,
} from "lucide-react"
import { useState, useEffect } from "react"

function useServerStatus() {
  const [status, setStatus] = useState({
    online: true,
    players: { online: 1847, max: 2000 },
    version: "1.20.1",
    motd: "StoneMC Server",
    ping: 45,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/server-status")
        const data = await response.json()
        setStatus(data)
      } catch (error) {
        console.error("Failed to fetch server status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { status, loading }
}

function ServerStatus() {
  const { status, loading } = useServerStatus()

  return (
    <div className="flex items-center gap-4">
      <div className="text-white font-bold text-xl">
        {loading ? "Ładowanie..." : `${status.players.online} / ${status.players.max}`}
      </div>
      <div className="text-gray-400">Graczy Online</div>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center">
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400 flex items-center justify-center gap-2">
        {icon}
        {label}
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  highlight,
}: { icon: React.ReactNode; title: string; description: string; highlight?: boolean }) {
  return (
    <div
      className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border ${
        highlight ? "border-blue-500" : "border-gray-700"
      } hover:border-blue-500 transition-colors duration-300`}
    >
      <div className="text-3xl text-blue-400 mb-4">{icon}</div>
      <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function ServerAddress() {
  const [isCopied, setIsCopied] = useState(false)
  const serverAddress = "stonemc.pl"

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(serverAddress)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
      <span className="text-white font-semibold">{serverAddress}</span>
      <Button variant="outline" onClick={handleCopyClick} disabled={isCopied}>
        {isCopied ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Skopiowano!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Kopiuj
          </>
        )}
      </Button>
    </div>
  )
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
        {step}
      </div>
      <h5 className="text-xl font-bold text-white mb-2">{title}</h5>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function RuleCard({
  number,
  title,
  description,
  severity,
}: { number: string; title: string; description: string; severity: "high" | "medium" | "low" }) {
  const severityColors = {
    high: "bg-red-800 text-red-200 border-red-600",
    medium: "bg-yellow-800 text-yellow-200 border-yellow-600",
    low: "bg-green-800 text-green-200 border-green-600",
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-white flex items-center">
          <Badge className={severityColors[severity]}>{number}</Badge>
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function MinecraftServer() {
  const [activeTab, setActiveTab] = useState("home")
  const [applicationType, setApplicationType] = useState("")
  const [formData, setFormData] = useState({
    nickname: "",
    age: "",
    position: "",
    experience: "",
    availability: "",
    discordNick: "",
    discordId: "",
    channelLink: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")
  const [discordValidation, setDiscordValidation] = useState({
    isValidating: false,
    isValid: false,
    userInfo: null,
    error: "",
  })
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })
  const [adminData, setAdminData] = useState({
    players: [
      { id: 1, name: "Player1", status: "online", lastSeen: "Teraz", ip: "192.168.1.1" },
      { id: 2, name: "Player2", status: "offline", lastSeen: "2 godziny temu", ip: "192.168.1.2" },
      { id: 3, name: "Player3", status: "online", lastSeen: "Teraz", ip: "192.168.1.3" },
    ],
    bans: [{ id: 1, player: "BadPlayer", reason: "Griefing", date: "2024-01-15", admin: "Admin1" }],
  })
  const [adminLoginError, setAdminLoginError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "discordId") {
      setDiscordValidation({
        isValidating: false,
        isValid: false,
        userInfo: null,
        error: "",
      })
    }
  }

  const validateDiscordId = async (discordId) => {
    if (!discordId || discordId.length < 17 || discordId.length > 19) {
      setDiscordValidation({
        isValidating: false,
        isValid: false,
        userInfo: null,
        error: "Discord ID musi mieć 17-19 cyfr",
      })
      return
    }

    setDiscordValidation((prev) => ({ ...prev, isValidating: true, error: "" }))

    try {
      // Using Discord's public API endpoint
      const response = await fetch(`https://discord.com/api/v10/users/${discordId}`, {
        headers: {
          Authorization: `Bot ${process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN || "dummy_token"}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        const avatarUrl = userData.avatar
          ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=64`
          : `https://cdn.discordapp.com/embed/avatars/${userData.discriminator % 5}.png`

        setDiscordValidation({
          isValidating: false,
          isValid: true,
          userInfo: {
            username: userData.username,
            discriminator: userData.discriminator,
            avatar: avatarUrl,
            displayName: userData.global_name || userData.username,
          },
          error: "",
        })
      } else {
        setDiscordValidation({
          isValidating: false,
          isValid: false,
          userInfo: null,
          error: "Nie znaleziono użytkownika o tym ID",
        })
      }
    } catch (error) {
      setDiscordValidation({
        isValidating: false,
        isValid: false,
        userInfo: null,
        error: "Błąd podczas sprawdzania Discord ID",
      })
    }
  }

  const handleDiscordIdChange = (e) => {
    const { value } = e.target
    handleInputChange(e)

    // Debounce validation
    setTimeout(() => {
      if (value === formData.discordId) {
        validateDiscordId(value)
      }
    }, 1000)
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    // Simple authentication - in production, this should be server-side
    if (adminCredentials.username === "admin" && adminCredentials.password === "admin123") {
      setIsAdminLoggedIn(true)
      setShowAdminLogin(false)
      setActiveTab("admin")
      setAdminLoginError("")
    } else {
      setAdminLoginError("Nieprawidłowe dane logowania!")
    }
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    setAdminCredentials({ username: "", password: "" })
    setActiveTab("home")
  }

  const handleBanPlayer = (playerId, reason) => {
    const player = adminData.players.find((p) => p.id === playerId)
    if (player && reason) {
      const newBan = {
        id: adminData.bans.length + 1,
        player: player.name,
        reason: reason,
        date: new Date().toISOString().split("T")[0],
        admin: "Admin",
      }
      setAdminData((prev) => ({
        ...prev,
        bans: [...prev.bans, newBan],
        players: prev.players.filter((p) => p.id !== playerId),
      }))
    }
  }

  const renderAdminPanel = () => (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Badge className="mb-4 bg-red-900 text-red-200 border-red-700">Panel Administracyjny</Badge>
            <h3 className="text-5xl font-bold text-white mb-2">Zarządzanie Serwerem</h3>
          </div>
          <Button
            onClick={handleAdminLogout}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-900 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Wyloguj
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Players Management */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-blue-400" />
              Gracze Online ({adminData.players.length})
            </h4>
            <div className="space-y-4">
              {adminData.players.map((player) => (
                <div key={player.id} className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${player.status === "online" ? "bg-green-400" : "bg-gray-400"}`}
                      ></div>
                      <span className="text-white font-semibold">{player.name}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      IP: {player.ip} • {player.lastSeen}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const reason = prompt("Podaj powód bana:")
                      if (reason) handleBanPlayer(player.id, reason)
                    }}
                  >
                    <Ban className="w-4 h-4 mr-1" />
                    Ban
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bans Management */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Ban className="w-6 h-6 mr-3 text-red-400" />
              Lista Banów ({adminData.bans.length})
            </h4>
            <div className="space-y-4">
              {adminData.bans.map((ban) => (
                <div key={ban.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-semibold">{ban.player}</span>
                      <p className="text-gray-400 text-sm mt-1">Powód: {ban.reason}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {ban.date} • przez {ban.admin}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-400 hover:bg-green-900 bg-transparent"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Unban
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Stats */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-green-400" />
              Statystyki Serwera
            </h4>
            <ServerStatsGrid />
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-gray-400" />
              Szybkie Akcje
            </h4>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-blue-900 hover:bg-blue-800 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Restart Serwera
              </Button>
              <Button className="w-full justify-start bg-yellow-900 hover:bg-yellow-800 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Wyślij Ogłoszenie
              </Button>
              <Button className="w-full justify-start bg-green-900 hover:bg-green-800 text-white">
                <Save className="w-4 h-4 mr-2" />
                Zapisz Świat
              </Button>
              <Button className="w-full justify-start bg-purple-900 hover:bg-purple-800 text-white">
                <Database className="w-4 h-4 mr-2" />
                Backup Bazy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
              {/* Hero Section */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                  <Badge className="mb-6 bg-gray-800 text-gray-200 border-gray-700 px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    Najlepszy Polski Serwer 2024
                  </Badge>

                  <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                    STONE
                    <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">MC</span>
                  </h2>

                  <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Odkryj nowy wymiar rozgrywki w najnowocześniejszym serwerze Minecraft w Polsce. Dołącz do tysięcy
                    graczy już dziś!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <ServerStatus />
                    <div className="flex gap-4">
                      <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-4 text-lg">
                        <Play className="w-5 h-5 mr-2" />
                        Zagraj Teraz
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                        onClick={() => window.open("https://discord.gg/cHYTkWcFCQ", "_blank")}
                      >
                        <Globe className="w-5 h-5 mr-2" />
                        Discord
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <StatCard icon={<Users className="w-6 h-6" />} value="3,247" label="Aktywni na Discord" />
                    <StatCard icon={<Trophy className="w-6 h-6" />} value="4 lata" label="Doświadczenia" />
                    <StatCard icon={<Heart className="w-6 h-6" />} value="50k+" label="Discord Społeczność" />
                  </div>
                </div>
              </div>
            </section>

            {/* Community Section */}
            <section className="py-24 bg-gradient-to-b from-gray-900/20 to-black">
              <div className="container mx-auto px-4 text-center">
                <Badge className="mb-4 bg-gray-800 text-gray-200 border-gray-700">Społeczność</Badge>
                <h3 className="text-5xl font-bold text-white mb-6">Dołącz do Nas</h3>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
                  Bądź na bieżąco z nowościami, znajdź nowych przyjaciół i uczesticz w dyskusjach z największą
                  społecznością Minecraft w Polsce!
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <Button
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 text-lg"
                    onClick={() => window.open("https://discord.gg/cHYTkWcFCQ", "_blank")}
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Discord - 25k członków
                  </Button>
                </div>
              </div>
            </section>
          </>
        )
      case "features":
        return <FeaturesContent />
      case "join":
        return <JoinContent />
      case "rules":
        return <RulesContent />
      case "shop":
        return <ShopContent />
      case "applications":
        return (
          <ApplicationsContent
            applicationType={applicationType}
            setApplicationType={setApplicationType}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            submitStatus={submitStatus}
            setSubmitStatus={setSubmitStatus}
            handleInputChange={handleInputChange}
            discordValidation={discordValidation}
            setDiscordValidation={setDiscordValidation}
            validateDiscordId={validateDiscordId}
            handleDiscordIdChange={handleDiscordIdChange}
          />
        )
      case "admin":
        return renderAdminPanel()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">StoneMC</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              onClick={() => setActiveTab("home")}
              className={`relative font-medium transition-all duration-300 ${
                activeTab === "home" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Strona główna
              {activeTab === "home" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </a>
            <a
              href="#features"
              onClick={() => setActiveTab("features")}
              className={`relative font-medium transition-all duration-300 ${
                activeTab === "features" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Funkcje
              {activeTab === "features" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </a>
            <a
              href="#join"
              onClick={() => setActiveTab("join")}
              className={`relative font-medium transition-all duration-300 ${
                activeTab === "join" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Jak dołączyć
              {activeTab === "join" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </a>
            <a
              href="#rules"
              onClick={() => setActiveTab("rules")}
              className={`relative font-medium transition-all duration-300 ${
                activeTab === "rules" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Regulamin
              {activeTab === "rules" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </a>
            <a
              href="#shop"
              onClick={() => setActiveTab("shop")}
              className={`relative font-medium transition-all duration-300 ${
                activeTab === "shop" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Sklep
              {activeTab === "shop" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </a>
            <a
              href="#applications"
              onClick={() => setActiveTab("applications")}
              className={`relative font-medium transition-all duration-300 ${
                activeTab === "applications" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Podania
              {activeTab === "applications" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </a>
            {isAdminLoggedIn && (
              <a
                href="#admin"
                onClick={() => setActiveTab("admin")}
                className={`relative font-medium transition-all duration-300 ${
                  activeTab === "admin" ? "text-red-400" : "text-gray-300 hover:text-red-400"
                }`}
              >
                Panel Admin
                {activeTab === "admin" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-400 rounded-full"></div>
                )}
              </a>
            )}
          </nav>
          <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
            <Play className="w-4 h-4 mr-2" />
            Zagraj
          </Button>
        </div>
      </header>

      <main className="pt-20">{renderContent()}</main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold">StoneMC</h4>
                <p className="text-gray-400 text-sm">Premium Minecraft Server</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300">
                <span
                  onClick={() => setShowAdminLogin(!showAdminLogin)}
                  className="cursor-pointer hover:text-white transition-colors select-none"
                  title="Admin Panel"
                >
                  ©
                </span>{" "}
                2024 StoneMC. Wszystkie prawa zastrzeżone.
              </p>
              <p className="text-gray-500 text-sm mt-1">Minecraft jest marką należącą do Mojang Studios</p>
            </div>
          </div>
        </div>

        {showAdminLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-96">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-bold">Panel Administracyjny</h3>
                <button onClick={() => setShowAdminLogin(false)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              {!isAdminLoggedIn ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Login</label>
                    <input
                      type="text"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      placeholder="Wprowadź login"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Hasło</label>
                    <input
                      type="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      placeholder="Wprowadź hasło"
                    />
                  </div>
                  <button
                    onClick={handleAdminLogin}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
                  >
                    Zaloguj się
                  </button>
                  {adminLoginError && <p className="text-red-400 text-sm text-center">{adminLoginError}</p>}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-400">✓ Zalogowano jako admin</span>
                    <button
                      onClick={() => {
                        setIsAdminLoggedIn(false)
                        setShowAdminLogin(false)
                        setActiveTab("admin")
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                    >
                      Otwórz Panel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </footer>
    </div>
  )
}

function HomeContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-gray-800 text-gray-200 border-gray-700 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Najlepszy Polski Serwer 2024
            </Badge>

            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
              STONE
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">MC</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Odkryj nowy wymiar rozgrywki w najnowocześniejszym serwerze Minecraft w Polsce. Dołącz do tysięcy graczy
              już dziś!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <ServerStatus />
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Zagraj Teraz
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                  onClick={() => window.open("https://discord.gg/cHYTkWcFCQ", "_blank")}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Discord
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard icon={<Users className="w-6 h-6" />} value="3,247" label="Aktywni na Discord" />
              <StatCard icon={<Trophy className="w-6 h-6" />} value="4 lata" label="Doświadczenia" />
              <StatCard icon={<Heart className="w-6 h-6" />} value="50k+" label="Discord Społeczność" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-gray-800 text-gray-200 border-gray-700">Społeczność</Badge>
          <h3 className="text-5xl font-bold text-white mb-6">Dołącz do Nas</h3>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Bądź na bieżąco z nowościami, znajdź nowych przyjaciół i uczesticz w dyskusjach z największą społecznością
            Minecraft w Polsce!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 text-lg"
              onClick={() => window.open("https://discord.gg/cHYTkWcFCQ", "_blank")}
            >
              <Globe className="w-5 h-5 mr-2" />
              Discord - 25k członków
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

function FeaturesContent() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900/20 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-800 text-gray-200 border-gray-700">Dlaczego my?</Badge>
          <h3 className="text-5xl font-bold text-white mb-6">Najlepsze doświadczenie</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Oferujemy unikalne funkcje i najwyższą jakość rozgrywki
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Bezpieczeństwo"
            description="Zaawansowane systemy anty-cheat i moderacja 24/7 zapewniają fair play"
            highlight={true}
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Wydajność"
            description="Najnowszy sprzęt i optymalizacje zapewniają płynną rozgrywkę bez lagów"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Społeczność"
            description="Przyjazna społeczność ponad 50,000 graczy i aktywni administratorzy"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Eventy"
            description="Regularne turnieje, konkursy i specjalne wydarzenia z nagrodami"
          />
          <FeatureCard
            icon={<Gamepad2 className="w-8 h-8" />}
            title="Tryby Gry"
            description="Survival, Creative, PvP, SkyBlock, Prison, Minigames i wiele więcej!"
            highlight={true}
          />
          <FeatureCard
            icon={<Crown className="w-8 h-8" />}
            title="Unikalne Pluginy"
            description="Własne pluginy i modyfikacje zwiększające zabawę i immersję"
          />
        </div>
      </div>
    </section>
  )
}

function JoinContent() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-black"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <Badge className="mb-4 bg-white text-black">Dołącz już dziś</Badge>
        <h3 className="text-5xl font-bold text-white mb-8">Jak Dołączyć?</h3>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Wystarczą 3 proste kroki, aby rozpocząć swoją przygodę
        </p>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-2xl">Adres Serwera</CardTitle>
              <CardDescription className="text-gray-300 text-lg">Skopiuj adres i wklej go w Minecraft</CardDescription>
            </CardHeader>
            <CardContent>
              <ServerAddress />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StepCard step="1" title="Otwórz Minecraft" description="Uruchom Minecraft Java Edition" />
                <StepCard step="2" title="Dodaj Serwer" description="Kliknij Multiplayer i dodaj nowy serwer" />
                <StepCard step="3" title="Graj!" description="Wklej adres i dołącz do zabawy" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function RulesContent() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900/20 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-900 text-red-200 border-red-700">
            <FileText className="w-4 h-4 mr-2" />
            Obowiązkowe
          </Badge>
          <h3 className="text-5xl font-bold text-white mb-6">Regulamin Serwera</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Zapoznaj się z zasadami obowiązującymi na serwerze StoneMC
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <RuleCard
            number="1"
            title="Szacunek dla innych graczy"
            description="Zakazane jest obrażanie, wyzywanie, dyskryminacja oraz jakiekolwiek formy nękania innych graczy."
            severity="high"
          />
          <RuleCard
            number="2"
            title="Zakaz używania cheatów"
            description="Wszelkie modyfikacje dające przewagę nad innymi graczami są zabronione. Dozwolone są tylko kosmetyczne mody."
            severity="high"
          />
          <RuleCard
            number="3"
            title="Nie griefuj"
            description="Niszczenie, kradzież lub modyfikowanie budowli innych graczy bez pozwolenia jest zabronione."
            severity="medium"
          />
          <RuleCard
            number="4"
            title="Język polski na chacie"
            description="Na chacie publicznym obowiązuje język polski. Inne języki dozwolone są na prywatnych wiadomościach."
            severity="low"
          />
          <RuleCard
            number="5"
            title="Zakaz reklamy"
            description="Zabronione jest reklamowanie innych serwerów, stron internetowych lub usług bez zgody administracji."
            severity="medium"
          />
          <RuleCard
            number="6"
            title="Odpowiednie nicki"
            description="Nazwy graczy nie mogą zawierać wulgaryzmów, treści obraźliwych lub wprowadzających w błąd."
            severity="low"
          />
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                Ważne Informacje
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>• Nieznajomość regulaminu nie zwalnia z jego przestrzegania</p>
              <p>• Administracja ma prawo do modyfikacji regulaminu w każdej chwili</p>
              <p>• W przypadku problemów skontaktuj się z administracją na Discord</p>
              <p>• Kary mogą być nakładane według uznania administracji</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ShopContent() {
  const [selectedRank, setSelectedRank] = useState<string | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900/20 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-900 text-green-200 border-green-700">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Premium
          </Badge>
          <h3 className="text-5xl font-bold text-white mb-6">Sklep Serwera</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Wspieraj serwer i zyskaj dostęp do ekskluzywnych funkcji
          </p>
        </div>

        {/* Rangi */}
        <div className="mb-16">
          <h4 className="text-3xl font-bold text-white text-center mb-8">Rangi</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="space-y-4">
              <h5 className="text-xl font-bold text-white text-center">VIP</h5>
              <ShopCard
                title="VIP - 7 dni"
                price="10 PLN"
                period="7 dni"
                features={[
                  "Kolorowy nick",
                  "VIP chat",
                  "Dostęp do /workbench",
                  "3 dodatkowe /sethome",
                  "Ekskluzywne komendy",
                ]}
                popular={false}
                onClick={() => setSelectedRank("VIP - 7 dni")}
              />
              <ShopCard
                title="VIP - 30 dni"
                price="30 PLN"
                period="30 dni"
                features={[
                  "Kolorowy nick",
                  "VIP chat",
                  "Dostęp do /workbench",
                  "3 dodatkowe /sethome",
                  "Ekskluzywne komendy",
                ]}
                popular={false}
                onClick={() => setSelectedRank("VIP - 30 dni")}
              />
              <ShopCard
                title="VIP - Lifetime"
                price="50 PLN"
                period="na zawsze"
                features={[
                  "Kolorowy nick",
                  "VIP chat",
                  "Dostęp do /workbench",
                  "3 dodatkowe /sethome",
                  "Ekskluzywne komendy",
                ]}
                popular={false}
                onClick={() => setSelectedRank("VIP - Lifetime")}
              />
            </div>

            <div className="space-y-4">
              <h5 className="text-xl font-bold text-white text-center">SVIP</h5>
              <ShopCard
                title="SVIP - 7 dni"
                price="20 PLN"
                period="7 dni"
                features={[
                  "Wszystko z VIP",
                  "Dostęp do /tp do graczy",
                  "Większy limit home (10)",
                  "Dostęp do /heal",
                  "Ekskluzywne skiny",
                ]}
                popular={false}
                onClick={() => setSelectedRank("SVIP - 7 dni")}
              />
              <ShopCard
                title="SVIP - 30 dni"
                price="60 PLN"
                period="30 dni"
                features={[
                  "Wszystko z VIP",
                  "Dostęp do /tp do graczy",
                  "Większy limit home (10)",
                  "Dostęp do /heal",
                  "Ekskluzywne skiny",
                ]}
                popular={true}
                onClick={() => setSelectedRank("SVIP - 30 dni")}
              />
              <ShopCard
                title="SVIP - Lifetime"
                price="100 PLN"
                period="na zawsze"
                features={[
                  "Wszystko z SVIP",
                  "Dostęp do /god",
                  "Nieograniczone /sethome",
                  "Własne GUI menu",
                  "Priorytetowa pomoc",
                ]}
                popular={false}
                onClick={() => setSelectedRank("SVIP - Lifetime")}
              />
            </div>

            <div className="space-y-4">
              <h5 className="text-xl font-bold text-white text-center">MVIP</h5>
              <ShopCard
                title="MVIP - 7 dni"
                price="35 PLN"
                period="7 dni"
                features={[
                  "Wszystko z SVIP",
                  "Dostęp do /god",
                  "Nieograniczone /sethome",
                  "Własne GUI menu",
                  "Priorytetowa pomoc",
                ]}
                popular={false}
                onClick={() => setSelectedRank("MVIP - 7 dni")}
              />
              <ShopCard
                title="MVIP - 30 dni"
                price="105 PLN"
                period="30 dni"
                features={[
                  "Wszystko z SVIP",
                  "Dostęp do /god",
                  "Nieograniczone /sethome",
                  "Własne GUI menu",
                  "Priorytetowa pomoc",
                ]}
                popular={true}
                onClick={() => setSelectedRank("MVIP - 30 dni")}
              />
              <ShopCard
                title="MVIP - Lifetime"
                price="150 PLN"
                period="na zawsze"
                features={[
                  "Wszystko z SVIP",
                  "Pełne uprawnienia administratora",
                  "Dostęp do wszystkich komend",
                  "Własny prefix i kolor",
                  "Ekskluzywne funkcje STONE",
                  "Priorytet we wszystkim",
                ]}
                popular={false}
                onClick={() => setSelectedRank("MVIP - Lifetime")}
              />
            </div>

            <div className="space-y-4">
              <h5 className="text-xl font-bold text-white text-center">STONE</h5>
              <ShopCard
                title="STONE - 7 dni"
                price="50 PLN"
                period="7 dni"
                features={[
                  "Wszystko z MVIP",
                  "Pełne uprawnienia administratora",
                  "Dostęp do wszystkich komend",
                  "Własny prefix i kolor",
                  "Ekskluzywne funkcje STONE",
                  "Priorytet we wszystkim",
                ]}
                popular={false}
                onClick={() => setSelectedRank("STONE - 7 dni")}
              />
              <ShopCard
                title="STONE - 30 dni"
                price="120 PLN"
                period="30 dni"
                features={[
                  "Wszystko z MVIP",
                  "Pełne uprawnienia administratora",
                  "Dostęp do wszystkich komend",
                  "Własny prefix i kolor",
                  "Ekskluzywne funkcje STONE",
                  "Priorytet we wszystkim",
                ]}
                popular={false}
                onClick={() => setSelectedRank("STONE - 30 dni")}
              />
              <ShopCard
                title="STONE - Lifetime"
                price="200 PLN"
                period="na zawsze"
                features={[
                  "Wszystko z MVIP",
                  "Pełne uprawnienia administratora",
                  "Dostęp do wszystkich komend",
                  "Własny prefix i kolor",
                  "Ekskluzywne funkcje STONE",
                  "Priorytet we wszystkim",
                ]}
                popular={false}
                onClick={() => setSelectedRank("STONE - Lifetime")}
              />
            </div>
          </div>
        </div>

        {/* Paczki Kluczy */}
        <div className="mb-16">
          <h4 className="text-3xl font-bold text-white text-center mb-8">Paczki Kluczy</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <KeyPackCard
              title="Paczka Podstawowa"
              price="14.99 PLN"
              keys={[
                { name: "Klucz Zwykły", amount: 5 },
                { name: "Klucz Rzadki", amount: 2 },
              ]}
              onClick={() => setSelectedRank("Paczka Podstawowa")}
            />
            <KeyPackCard
              title="Paczka Premium"
              price="29.99 PLN"
              keys={[
                { name: "Klucz Zwykły", amount: 10 },
                { name: "Klucz Rzadki", amount: 5 },
                { name: "Klucz Epicki", amount: 2 },
              ]}
              popular={true}
              onClick={() => setSelectedRank("Paczka Premium")}
            />
            <KeyPackCard
              title="Paczka Legendarna"
              price="49.99 PLN"
              keys={[
                { name: "Klucz Rzadki", amount: 10 },
                { name: "Klucz Epicki", amount: 5 },
                { name: "Klucz Legendarny", amount: 1 },
              ]}
              onClick={() => setSelectedRank("Paczka Legendarna")}
            />
          </div>
        </div>

        {selectedRank && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  <span>Zakup: {selectedRank}</span>
                  <button onClick={() => setSelectedRank(null)} className="text-gray-400 hover:text-white">
                    ✕
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                    Jak zakupić?
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Aby zakupić rangę, skontaktuj się z nami jednym z poniższych sposobów:
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => window.open("https://discord.gg/cHYTkWcFCQ", "_blank")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Stwórz ticket na Discord
                    </button>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-300 text-sm">
                        <strong className="text-white">Lub napisz bezpośrednio do:</strong>
                      </p>
                      <p className="text-blue-400 font-mono">big_maciej</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setSelectedRank(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors"
                  >
                    Zamknij
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-16 text-center">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center justify-center">
                <Gift className="w-6 h-6 mr-2 text-green-400" />
                Informacje o Płatnościach
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>• Płatności są bezpieczne i szyfrowane</p>
              <p>• Rangi i klucze aktywują się automatycznie</p>
              <p>• Możliwość płatności BLIK, kartą lub PayPal</p>
              <p>• Wsparcie techniczne dostępne 24/7</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ShopCard({
  title,
  price,
  period,
  features,
  popular,
  onClick,
}: { title: string; price: string; period: string; features: string[]; popular: boolean; onClick?: () => void }) {
  return (
    <Card
      className={`${popular ? "border-green-600 bg-green-900/20" : "bg-gray-900/30 border-gray-700"} backdrop-blur-sm hover:bg-gray-800/50 transition-all relative cursor-pointer`}
      onClick={onClick}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-green-600 text-white px-4 py-1">Najpopularniejsze</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-white text-2xl">{title}</CardTitle>
        <div className="text-3xl font-bold text-white">{price}</div>
        <p className="text-gray-400">/{period}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-300 flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">Kliknij aby zobaczyć opcje zakupu</p>
        </div>
      </CardContent>
    </Card>
  )
}

function KeyPackCard({
  title,
  price,
  keys,
  popular = false,
  onClick,
}: {
  title: string
  price: string
  keys: { name: string; amount: number }[]
  popular?: boolean
  onClick?: () => void
}) {
  return (
    <Card
      className={`${popular ? "border-yellow-600 bg-yellow-900/20" : "bg-gray-900/30 border-gray-700"} backdrop-blur-sm hover:bg-gray-800/50 transition-all relative cursor-pointer`}
      onClick={onClick}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-yellow-600 text-white px-4 py-1">Najlepsza wartość</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-white text-2xl">{title}</CardTitle>
        <div className="text-2xl font-bold text-white">{price}</div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {keys.map((key, index) => (
            <li key={index} className="text-gray-300 flex items-center justify-between">
              <span className="flex items-center">
                <Key className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                {key.name}
              </span>
              <span className="text-white font-semibold">{key.amount}x</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">Kliknij aby zobaczyć opcje zakupu</p>
        </div>
      </CardContent>
    </Card>
  )
}

const ApplicationsContent = ({
  applicationType,
  setApplicationType,
  formData,
  setFormData,
  isSubmitting,
  setIsSubmitting,
  submitStatus,
  setSubmitStatus,
  handleInputChange,
  discordValidation,
  setDiscordValidation,
  validateDiscordId,
  handleDiscordIdChange,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("")

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL || "YOUR_DISCORD_WEBHOOK_URL"

      const embed = {
        title: `🎯 Nowe Podanie ${applicationType} - StoneMC`,
        color: applicationType === "Trial-Support" ? 0x5865f2 : 0xff6b6b,
        fields: [
          { name: "📋 Typ Podania", value: applicationType, inline: true },
          { name: "👤 Nickname", value: formData.nickname, inline: true },
          { name: "🎂 Wiek", value: formData.age, inline: true },
          { name: "💼 Stanowisko", value: formData.position, inline: true },
          { name: "⭐ Doświadczenie", value: formData.experience, inline: false },
          { name: "💭 Dlaczego chcesz dołączyć?", value: formData.reason, inline: false },
          { name: "⏰ Dostępność", value: formData.availability, inline: true },
          { name: "💬 Discord Nick", value: formData.discordNick, inline: true },
          { name: "🆔 Discord ID", value: formData.discordId, inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "StoneMC - System Podań",
        },
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          nickname: "",
          age: "",
          position: "",
          experience: "",
          availability: "",
          channelLink: "",
          discordNick: "",
          discordId: "",
        })
        setApplicationType("")
        setDiscordValidation({
          isValidating: false,
          isValid: false,
          userInfo: null,
          error: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Podania do Zespołu
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Chcesz dołączyć do naszego zespołu? Wybierz typ podania i wypełnij formularz!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!applicationType && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div
                onClick={() => setApplicationType("Trial-Support")}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Trial-Support</h3>
                  <p className="text-gray-300 mb-6">
                    Dołącz do zespołu administracji jako Trial-Support. Pomóż graczom i dbaj o porządek na serwerze.
                  </p>
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-300 font-medium">Wymagania:</p>
                    <ul className="text-sm text-blue-200 mt-2 space-y-1">
                      <li>• Minimum 16 lat</li>
                      <li>• Doświadczenie z Minecraft</li>
                      <li>• Aktywność na serwerze</li>
                      <li>• Znajomość zasad</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setApplicationType("Media")}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📹</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">Media</h3>
                  <p className="text-gray-300 mb-6">
                    Twórz content dla StoneMC! Nagrywaj filmy, streamuj i promuj nasz serwer w social mediach.
                  </p>
                  <div className="bg-red-500/20 rounded-lg p-4 mb-4">
                    <p className="text-red-300 font-medium">Wymagania:</p>
                    <ul className="text-sm text-red-200 mt-2 space-y-1">
                      <li>• Kanał YouTube/Twitch</li>
                      <li>• Minimum 100 subskrypcji</li>
                      <li>• Regularna aktywność</li>
                      <li>• Dobra jakość content'u</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">
                      📺 <strong>Wyślij link do swojego kanału:</strong>
                    </p>
                    <p className="text-gray-400 text-xs mt-1">YouTube, Twitch, TikTok lub inny</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {applicationType && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Podanie - {applicationType}</h2>
                <button
                  onClick={() => setApplicationType("")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ← Powrót do wyboru
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nickname w grze *</label>
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Twój nickname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Wiek *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="13"
                      max="99"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Twój wiek"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {applicationType === "Media" ? "Typ Content'u *" : "Stanowisko *"}
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                  >
                    <option value="">
                      {applicationType === "Media" ? "Wybierz typ content'u" : "Wybierz stanowisko"}
                    </option>
                    {applicationType === "Trial-Support" ? (
                      <>
                        <option value="Helper">Helper</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Builder">Builder</option>
                        <option value="Developer">Developer</option>
                      </>
                    ) : (
                      <>
                        <option value="YouTuber">YouTuber</option>
                        <option value="Streamer">Streamer (Twitch)</option>
                        <option value="TikToker">TikToker</option>
                        <option value="Instagram">Instagram Creator</option>
                        <option value="Multi-platform">Multi-platform Creator</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {applicationType === "Media" ? "Link do kanału/profilu *" : "Doświadczenie *"}
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder={
                      applicationType === "Media"
                        ? "Wklej link do swojego kanału YouTube, Twitch, TikTok lub innego..."
                        : "Opisz swoje doświadczenie z administrowaniem serwerów Minecraft..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dlaczego chcesz dołączyć do naszego zespołu? *
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Powiedz nam, dlaczego chcesz być częścią StoneMC..."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Dostępność *</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                    >
                      <option value="">Wybierz dostępność</option>
                      <option value="1-2 godziny dziennie">1-2 godziny dziennie</option>
                      <option value="3-4 godziny dziennie">3-4 godziny dziennie</option>
                      <option value="5+ godzin dziennie">5+ godzin dziennie</option>
                      <option value="Weekendy">Głównie weekendy</option>
                      <option value="Wieczory">Wieczory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Discord Nick *</label>
                    <input
                      type="text"
                      name="discordNick"
                      value={formData.discordNick}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                      placeholder="twojnick"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Discord ID *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="discordId"
                        value={formData.discordId}
                        onChange={handleDiscordIdChange}
                        required
                        className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 ${
                          discordValidation.isValid
                            ? "border-green-500"
                            : discordValidation.error
                              ? "border-red-500"
                              : "border-gray-600"
                        }`}
                        placeholder="123456789012345678"
                      />
                      {discordValidation.isValidating && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        </div>
                      )}
                      {discordValidation.isValid && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {discordValidation.error && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {discordValidation.userInfo && (
                      <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                        <div className="flex items-center space-x-3">
                          <img
                            src={discordValidation.userInfo.avatar || "/placeholder.svg"}
                            alt="Discord Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium">{discordValidation.userInfo.displayName}</p>
                            <p className="text-gray-400 text-sm">@{discordValidation.userInfo.username}</p>
                            {formData.discordNick && (
                              <div className="mt-1">
                                {formData.discordNick.toLowerCase() ===
                                  discordValidation.userInfo.username.toLowerCase() ||
                                formData.discordNick.toLowerCase() ===
                                  discordValidation.userInfo.displayName.toLowerCase() ? (
                                  <span className="text-green-400 text-xs flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    Nick się zgadza
                                  </span>
                                ) : (
                                  <span className="text-yellow-400 text-xs flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                      />
                                    </svg>
                                    Nick nie pasuje do konta
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {discordValidation.error && <p className="mt-2 text-red-400 text-sm">{discordValidation.error}</p>}
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300">
                    ✅ Podanie zostało wysłane pomyślnie! Skontaktujemy się z Tobą wkrótce.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300">
                    ❌ Wystąpił błąd podczas wysyłania podania. Spróbuj ponownie.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-white to-gray-200 text-black font-bold py-4 px-8 rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij Podanie"}
                </button>
              </form>
            </div>
          )}

          <div className="mt-8 text-center text-gray-400">
            <p className="text-sm">* Pola wymagane. Wszystkie podania są rozpatrywane indywidualnie.</p>
            <p className="text-sm mt-2">Odpowiedź otrzymasz na Discordzie w ciągu 24-48 godzin.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServerStatsGrid() {
  const { status, loading } = useServerStatus()

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-blue-400">{loading ? "..." : `${status.ping}ms`}</div>
        <div className="text-gray-400 text-sm">Ping</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-yellow-400">
          {loading ? "..." : `${status.players.online}/${status.players.max}`}
        </div>
        <div className="text-gray-400 text-sm">Gracze</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-purple-400">{loading ? "..." : status.version}</div>
        <div className="text-gray-400 text-sm">Wersja</div>
      </div>
    </div>
  )
}
