'use client'

import { useState, useEffect } from 'react'
import { ModernNavbar } from '../components/ModernNavbar'
import { SmoothScroll } from '../components/SmoothScroll'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ExternalLink, Briefcase, Globe } from 'lucide-react'
import Link from 'next/link'

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

export default function CareersPage() {
  const [jobOpenings, setJobOpenings] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({});

  // Add toggle function for expanding/collapsing job descriptions
  const toggleJobDescription = (jobId: string) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

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
          setJobOpenings(data.data.positions);
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

  // Helper function to format job type
  const formatJobType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Helper function to get location display string
  const getLocationString = (location: Location) => {
    const parts = [];
    
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (parts.length === 0 && location.country) return location.country;
    
    return parts.join(', ');
  };

  return (
    <SmoothScroll>
      <ModernNavbar />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div 
          className="w-full max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-pizza font-bold mb-8 text-center text-primary">Join Our Team</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Explore exciting career opportunities with PNE Pizza. We're looking for passionate individuals to join our growing team and help us deliver delicious pizzas and exceptional experiences to our customers.
          </p>
          
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">Error: {error}</p>
              <p>Please try again later or contact support.</p>
            </div>
          )}
          
          {!loading && !error && jobOpenings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg">No job openings available at this time.</p>
              <p>Please check back later for new opportunities.</p>
            </div>
          )}
          
          {!loading && !error && jobOpenings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job) => (
                <motion.div
                  key={job.uuid}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold flex items-center justify-between">
                        {job.title}
                        <Badge variant={job.status === "published" ? "secondary" : "outline"}>
                          {job.pay_amount}
                        </Badge>
                      </CardTitle>
                      {job.location && getLocationString(job.location) && (
                        <CardDescription className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {getLocationString(job.location)}
                        </CardDescription>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.job_type && (
                          <CardDescription className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatJobType(job.job_type)}
                          </CardDescription>
                        )}
                        {job.pay_frequency && (
                          <CardDescription className="text-sm text-gray-500 flex items-center ml-2">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {`per ${job.pay_frequency}`}
                          </CardDescription>
                        )}
                      </div>
                      {job.remote_type && (
                        <CardDescription className="text-sm text-gray-500 flex items-center mt-1">
                          <Globe className="w-4 h-4 mr-1" />
                          {formatJobType(job.remote_type)}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className={`text-sm mb-4 ${!expandedJobs[job.uuid] ? "line-clamp-3" : ""}`}>
                        <div dangerouslySetInnerHTML={{ __html: job.overview }}></div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleJobDescription(job.uuid)}
                        className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                      >
                        {expandedJobs[job.uuid] ? "Show Less" : "Show More"}
                      </Button>
                      
                      {job.location && (
                        <div className="text-sm text-gray-600 mt-2">
                          {job.location.address && <p>{job.location.address}</p>}
                          {job.location.city && job.location.postal_code && (
                            <p>{job.location.city}, {job.location.postal_code}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Link href={job.job_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full flex items-center justify-center">
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </SmoothScroll>
  )
}

