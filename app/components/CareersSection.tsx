import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, DollarSign, Heart, Zap, MapPin, ExternalLink } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

// Define types for the API response
interface Location {
  uuid: string;
  digest_key: string;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
}

interface Position {
  uuid: string;
  digest_key: string;
  title: string;
  overview: string;
  status: string;
  number: string;
  access: string;
  pay_amount: string;
  pay_frequency: string;
  job_type: string;
  normalized_titles: string[];
  remote_type: string;
  job_url: string;
  location: Location;
}

interface ApiResponse {
  success: boolean;
  data: {
    positions: Position[];
  };
}

const benefits = [
  { icon: <DollarSign className="h-6 w-6" />, title: "Competitive Pay", description: "We offer above-industry standard wages to all our team members." },
  { icon: <Zap className="h-6 w-6" />, title: "Immediate Pay", description: "Access your earnings when you need them with our immediate pay option." },
  { icon: <Heart className="h-6 w-6" />, title: "Comprehensive Benefits", description: "Health, dental, and vision insurance for eligible employees." },
  { icon: <BadgeCheck className="h-6 w-6" />, title: "Growth Opportunities", description: "Clear path for advancement and professional development." },
]

export function CareersSection({ id, className }: { id?: string, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [jobOpenings, setJobOpenings] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/v1/positions`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data.positions) {
          // Only take the first 6 positions
          setJobOpenings(data.data.positions.slice(0, 8));
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Error fetching job positions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch job positions');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Helper function to get location display string
  const getLocationString = (location: Location) => {
    const parts = [];
    
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (parts.length === 0 && location.country) return location.country;
    
    return parts.join(', ');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 } 
    }
  }

  return (
    <motion.section 
      ref={ref}
      id={id} 
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
        <motion.h2 className="text-4xl font-pizza font-bold mb-8 text-center text-primary" variants={itemVariants}>Join Our Team</motion.h2>
        
        <motion.div className="grid md:grid-cols-2 gap-12" variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-pizza font-bold mb-4">Current Openings</h3>
            
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            
            {error && (
              <div className="text-center py-4">
                <p className="text-red-500 text-sm">Unable to load job openings</p>
              </div>
            )}
            
            {!loading && !error && jobOpenings.length === 0 && (
              <div className="text-center py-4">
                <p>No job openings available at this time.</p>
              </div>
            )}
            
            {!loading && !error && jobOpenings.length > 0 && (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobOpenings.map((job) => (
                  <motion.div key={job.uuid} variants={itemVariants}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{job.title}</CardTitle>
                          {job.pay_amount && (
                            <Badge variant="outline" className="text-xs">
                              {job.pay_amount}
                            </Badge>
                          )}
                        </div>
                        {job.location && getLocationString(job.location) && (
                          <CardDescription className="text-xs flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {getLocationString(job.location)}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0 pb-4 flex-grow flex flex-col">
                        <div className="text-xs line-clamp-2 mb-3 flex-grow">
                          <div dangerouslySetInnerHTML={{ __html: job.overview }}></div>
                        </div>
                        <Link href={job.job_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full text-xs flex items-center justify-center">
                            Apply
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            <motion.div className="mt-6" variants={itemVariants}>
              <Link href="/careers">
                <Button variant="default" size="lg" className="w-full">Show More Openings</Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-pizza font-bold mb-4">Why Join PNE Pizza?</h3>
            <motion.p className="mb-6" variants={itemVariants}>At PNE Pizza, we're more than just a workplace - we're a family. We're committed to creating an environment where our employees can thrive, grow, and enjoy their work.</motion.p>
            <motion.div className="grid gap-6" variants={itemVariants}>
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {benefit.icon}
                        <span className="ml-2">{benefit.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="mt-8" variants={itemVariants}>
              <h4 className="text-xl font-bold mb-4">Employee-Obsessed Culture</h4>
              <p>We believe that happy employees make for happy customers. That's why we've implemented a scorecard system to ensure fair evaluations and reward exceptional performance. Join a team that truly values your contributions!</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

