import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, ExternalLink, MapPin } from "lucide-react"
import Link from "next/link"

interface Partner {
  id: string
  name: string
  type: "ngo" | "recycler" | "corporate"
  description: string
  location: string
  verified: boolean
  logo: string
  website?: string
}

const partners: Partner[] = [
  {
    id: "1",
    name: "Green Earth Foundation",
    type: "ngo",
    description: "Working towards a plastic-free India through community engagement and education.",
    location: "New Delhi",
    verified: true,
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/green-earth",
  },
  {
    id: "2",
    name: "EcoRecycle India",
    type: "recycler",
    description: "Leading plastic recycling company with facilities across major Indian cities.",
    location: "Mumbai",
    verified: true,
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/ecorecycle",
  },
  {
    id: "3",
    name: "Clean Bharat Initiative",
    type: "ngo",
    description: "Grassroots organization focused on cleaning up plastic waste from rivers and beaches.",
    location: "Chennai",
    verified: true,
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/clean-bharat",
  },
  {
    id: "4",
    name: "Tata Sustainability",
    type: "corporate",
    description: "Corporate sustainability program supporting plastic waste reduction initiatives.",
    location: "Bangalore",
    verified: true,
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/tata-sustainability",
  },
  {
    id: "5",
    name: "Plastic Free Kolkata",
    type: "ngo",
    description: "Local NGO working to eliminate single-use plastics in Kolkata.",
    location: "Kolkata",
    verified: false,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Reliance Green Initiative",
    type: "corporate",
    description: "Corporate program focused on plastic waste management and recycling innovation.",
    location: "Mumbai",
    verified: true,
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/reliance-green",
  },
]

export default function PartnersPage() {
  return (
    <div className="container p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Partners & NGOs</h1>
        <p className="text-muted-foreground">Organizations working with EcoLoop Bharat to reduce plastic waste</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Partners</TabsTrigger>
          <TabsTrigger value="ngo">NGOs</TabsTrigger>
          <TabsTrigger value="recycler">Recyclers</TabsTrigger>
          <TabsTrigger value="corporate">Corporate Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ngo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners
              .filter((partner) => partner.type === "ngo")
              .map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recycler" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners
              .filter((partner) => partner.type === "recycler")
              .map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="corporate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners
              .filter((partner) => partner.type === "corporate")
              .map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-green-50 border-green-100">
        <CardHeader>
          <CardTitle>Become a Partner</CardTitle>
          <CardDescription>Join our network of organizations working to reduce plastic waste in India</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Whether you're an NGO, recycling company, or corporate entity, we welcome partnerships that help advance our
            mission of reducing plastic waste and promoting sustainable practices across India.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="bg-green-600 hover:bg-green-700">Apply for Partnership</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{partner.name}</CardTitle>
            {partner.verified && (
              <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="mr-1 h-3 w-3" />
            {partner.location}
          </div>
          <Badge variant="outline" className="mt-2">
            {partner.type === "ngo" ? "NGO" : partner.type === "recycler" ? "Recycler" : "Corporate Partner"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{partner.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Profile
        </Button>
        {partner.website && (
          <Link href={partner.website} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Website
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
