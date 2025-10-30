import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Menu, Home, BookOpen, ClipboardList, BookMarked, Search, FileText, Layers, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import englishImg from '@/assets/english-subject.png';
import mathImg from '@/assets/mathematics-subject.png';
import scienceImg from '@/assets/science-subject.png';
import hindiImg from '@/assets/hindi-subject.png';

const subjects = [
  { id: "english", title: "English", image: englishImg, color: "from-green-400 to-green-600" },
  { id: "mathematics", title: "Mathematics", image: mathImg, color: "from-purple-400 to-purple-600" },
  { id: "science", title: "Science", image: scienceImg, color: "from-blue-400 to-blue-600" },
  { id: "hindi", title: "Hindi", image: hindiImg, color: "from-orange-400 to-orange-600" },
];

const chapters = {
  english: ["Chapter 1: Alphabet", "Chapter 2: Words", "Chapter 3: Sentences"],
  mathematics: ["Chapter 1: Numbers", "Chapter 2: Addition", "Chapter 3: Subtraction"],
  science: ["Chapter 1: Plants", "Chapter 2: Animals", "Chapter 3: Water"],
  hindi: ["Chapter 1: वर्णमाला", "Chapter 2: शब्द", "Chapter 3: वाक्य"],
};

const learningResources = [
  { id: "1", name: "Introduction to Numbers", subject: "mathematics", chapter: "Chapter 1: Numbers", type: "video", icon: Video, duration: "12 min" },
  { id: "2", name: "Basic Arithmetic Worksheet", subject: "mathematics", chapter: "Chapter 2: Addition", type: "pdf", icon: FileText, pages: "5 pages" },
  { id: "3", name: "Math Games", subject: "mathematics", chapter: "Chapter 2: Addition", type: "interactive", icon: Layers, duration: "15 min" },
  { id: "4", name: "Science Experiments", subject: "science", chapter: "Chapter 2: Animals", type: "video", icon: Video, duration: "18 min" },
  { id: "5", name: "English Grammar Guide", subject: "english", chapter: "Chapter 3: Sentences", type: "pdf", icon: FileText, pages: "8 pages" },
  { id: "6", name: "Language Practice", subject: "english", chapter: "Chapter 2: Words", type: "interactive", icon: Layers, duration: "10 min" },
  { id: "7", name: "Plant Life Cycle", subject: "science", chapter: "Chapter 1: Plants", type: "video", icon: Video, duration: "14 min" },
  { id: "8", name: "Hindi Alphabets", subject: "hindi", chapter: "Chapter 1: वर्णमाला", type: "interactive", icon: Layers, duration: "12 min" },
];

const assessments = [
  { id: "1", name: "Math Quiz - Addition", type: "Worksheet", dueDate: "Oct 12, 2025" },
  { id: "2", name: "Science Lab Activity", type: "Activity", dueDate: "Oct 13, 2025" },
  { id: "3", name: "English Comprehension", type: "Worksheet", dueDate: "Oct 11, 2025" },
];

const lessonPlans = [
  { id: "1", title: "Fun with Numbers", subject: "mathematics", chapter: "Chapter 1: Numbers", duration: "30 min", date: "Oct 30, 2025" },
  { id: "2", title: "Addition Basics", subject: "mathematics", chapter: "Chapter 2: Addition", duration: "35 min", date: "Oct 31, 2025" },
  { id: "3", title: "Science of Plants", subject: "science", chapter: "Chapter 1: Plants", duration: "40 min", date: "Nov 1, 2025" },
  { id: "4", title: "Animal Kingdom", subject: "science", chapter: "Chapter 2: Animals", duration: "35 min", date: "Nov 2, 2025" },
  { id: "5", title: "Reading Stories", subject: "english", chapter: "Chapter 3: Sentences", duration: "25 min", date: "Nov 3, 2025" },
  { id: "6", title: "Word Building", subject: "english", chapter: "Chapter 2: Words", duration: "30 min", date: "Nov 4, 2025" },
  { id: "7", title: "Hindi Basics", subject: "hindi", chapter: "Chapter 1: वर्णमाला", duration: "30 min", date: "Nov 5, 2025" },
];

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'resources' | 'assessments' | 'lessons'>('home');
  const [selectedClass, setSelectedClass] = useState('grade1');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lessonSubject, setLessonSubject] = useState('all');
  const [lessonChapter, setLessonChapter] = useState('all');
  const [lessonSearch, setLessonSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/book-reader?subject=${subjectId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/learner-login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/40 via-transparent to-purple-100/40 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/30 via-transparent to-blue-100/30 animate-gradient-slow"></div>
      
      {/* WhatsApp-style doodle pattern background */}
      <div className="absolute inset-0 opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Book */}
              <path d="M20,30 L35,30 L35,45 L20,45 Z" fill="none" stroke="#4F46E5" strokeWidth="1.5" opacity="0.3"/>
              <line x1="20" y1="35" x2="35" y2="35" stroke="#4F46E5" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Star */}
              <path d="M150,20 L153,28 L162,28 L155,33 L158,42 L150,36 L142,42 L145,33 L138,28 L147,28 Z" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Pencil */}
              <path d="M70,80 L75,75 L78,78 L73,83 Z M75,75 L80,70" fill="none" stroke="#EC4899" strokeWidth="1.5" opacity="0.3"/>
              <rect x="73" y="83" width="3" height="8" fill="none" stroke="#EC4899" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Light bulb */}
              <circle cx="170" cy="100" r="8" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.3"/>
              <path d="M165,108 L175,108" stroke="#F59E0B" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Trophy */}
              <path d="M40,150 L40,145 L35,145 L35,140 L45,140 L45,145 L50,145 L50,150 Z M38,150 L42,150 L42,155 L38,155 Z" fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Graduation cap */}
              <path d="M100,160 L90,155 L100,150 L110,155 Z M100,155 L100,165" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Apple */}
              <circle cx="180" cy="170" r="8" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.3"/>
              <path d="M180,162 L180,158" stroke="#10B981" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Music note */}
              <path d="M25,100 L25,115 M25,100 L32,98 L32,113" fill="none" stroke="#6366F1" strokeWidth="1.5" opacity="0.3"/>
              <circle cx="25" cy="115" r="3" fill="none" stroke="#6366F1" strokeWidth="1.5" opacity="0.3"/>
              
              {/* Calculator */}
              <rect x="140" y="140" width="20" height="25" rx="2" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.3"/>
              <line x1="143" y1="145" x2="157" y2="145" stroke="#06B6D4" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern)"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-l-md transform -rotate-12 shadow-md"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-md transform rotate-0 translate-x-1 shadow-md"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-green-500 rounded-r-md transform rotate-12 translate-x-2 shadow-md"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 leading-tight">Oxford</span>
              <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">Advantage</span>
            </div>
          </div>
          
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grade1">Grade 1</SelectItem>
              <SelectItem value="grade2">Grade 2</SelectItem>
              <SelectItem value="grade3">Grade 3</SelectItem>
              <SelectItem value="grade4">Grade 4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
          {/* Home Tab - Subject Cards */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Your Subjects
                </h2>
                <p className="text-sm text-gray-600">Select a subject to start learning</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {subjects.map((subject) => (
                  <Card 
                    key={subject.id}
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden bg-white border border-gray-100 shadow-lg group rounded-2xl"
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    <CardContent className="p-0">
                      <div className="overflow-hidden rounded-t-2xl">
                        <img 
                          src={subject.image} 
                          alt={subject.title}
                          className="w-full h-44 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
                        />
                      </div>
                      <div className="px-4 py-5 bg-gradient-to-b from-white to-gray-50">
                        <h3 className="text-gray-800 text-base font-heading font-semibold text-center tracking-wide">
                          {subject.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Learning Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-1 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Learning Resources
                </h2>
                <p className="text-sm text-gray-600">Access your study materials and practice content</p>
              </div>

              {/* Filters Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex flex-col gap-3">
                  {/* Subject and Chapter Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Subject</label>
                      <Select 
                        value={selectedSubject} 
                        onValueChange={(value) => {
                          setSelectedSubject(value);
                          setSelectedChapter('all');
                        }}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-200 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Chapter</label>
                      <Select 
                        value={selectedChapter} 
                        onValueChange={setSelectedChapter}
                        disabled={selectedSubject === 'all'}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-200 h-10">
                          <SelectValue placeholder="All Chapters" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Chapters</SelectItem>
                          {selectedSubject !== 'all' && chapters[selectedSubject as keyof typeof chapters]?.map((chapter, idx) => (
                            <SelectItem key={idx} value={chapter}>{chapter}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white border-gray-200 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 gap-3">
                {learningResources
                  .filter((resource) => {
                    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
                    const matchesChapter = selectedChapter === 'all' || resource.chapter === selectedChapter;
                    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesSubject && matchesChapter && matchesSearch;
                  })
                  .map((resource) => {
                    const Icon = resource.icon;
                    const typeColors = {
                      video: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
                      pdf: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
                      interactive: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' }
                    };
                    const colors = typeColors[resource.type as keyof typeof typeColors];
                    
                    return (
                      <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white group cursor-pointer overflow-hidden rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={cn("p-3 rounded-xl transition-all duration-300 group-hover:scale-110", colors.bg)}>
                              <Icon className={cn("w-6 h-6", colors.text)} />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {resource.name}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2 line-clamp-1">{resource.chapter}</p>
                              
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium border capitalize", colors.bg, colors.text, colors.border)}>
                                  {resource.type}
                                </span>
                                {'duration' in resource && (
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    {resource.duration}
                                  </span>
                                )}
                                {'pages' in resource && (
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    {resource.pages}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>

              {/* Empty State */}
              {learningResources.filter((resource) => {
                const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
                const matchesChapter = selectedChapter === 'all' || resource.chapter === selectedChapter;
                const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSubject && matchesChapter && matchesSearch;
              }).length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No resources found</p>
                  <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Assessments
                </h2>
                <p className="text-sm text-gray-600">View your assignments and tests</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {assessments.map((assessment) => (
                  <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-1">{assessment.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded">{assessment.type}</span>
                            <span>Due: {assessment.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Lesson Plans Tab */}
          {activeTab === 'lessons' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-1 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Lesson Plans
                </h2>
                <p className="text-sm text-gray-600">View your scheduled lessons and topics</p>
              </div>

              {/* Filters Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex flex-col gap-3">
                  {/* Subject and Chapter Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Subject</label>
                      <Select 
                        value={lessonSubject} 
                        onValueChange={(value) => {
                          setLessonSubject(value);
                          setLessonChapter('all');
                        }}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-200 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Chapter</label>
                      <Select 
                        value={lessonChapter} 
                        onValueChange={setLessonChapter}
                        disabled={lessonSubject === 'all'}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-200 h-10">
                          <SelectValue placeholder="All Chapters" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Chapters</SelectItem>
                          {lessonSubject !== 'all' && chapters[lessonSubject as keyof typeof chapters]?.map((chapter, idx) => (
                            <SelectItem key={idx} value={chapter}>{chapter}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search lessons..."
                        value={lessonSearch}
                        onChange={(e) => setLessonSearch(e.target.value)}
                        className="pl-10 bg-white border-gray-200 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Plans Grid */}
              <div className="grid grid-cols-1 gap-3">
                {lessonPlans
                  .filter((lesson) => {
                    const matchesSubject = lessonSubject === 'all' || lesson.subject === lessonSubject;
                    const matchesChapter = lessonChapter === 'all' || lesson.chapter === lessonChapter;
                    const matchesSearch = lesson.title.toLowerCase().includes(lessonSearch.toLowerCase());
                    return matchesSubject && matchesChapter && matchesSearch;
                  })
                  .map((lesson) => {
                    const subjectColors = {
                      english: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
                      mathematics: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
                      science: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
                      hindi: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' }
                    };
                    const colors = subjectColors[lesson.subject as keyof typeof subjectColors];
                    
                    return (
                      <Card key={lesson.id} className="hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white group cursor-pointer overflow-hidden rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={cn("p-3 rounded-xl transition-all duration-300 group-hover:scale-110", colors.bg)}>
                              <BookMarked className={cn("w-6 h-6", colors.text)} />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {lesson.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2 line-clamp-1">{lesson.chapter}</p>
                              
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium border capitalize", colors.bg, colors.text, colors.border)}>
                                  {lesson.subject}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  {lesson.duration}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  {lesson.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>

              {/* Empty State */}
              {lessonPlans.filter((lesson) => {
                const matchesSubject = lessonSubject === 'all' || lesson.subject === lessonSubject;
                const matchesChapter = lessonChapter === 'all' || lesson.chapter === lessonChapter;
                const matchesSearch = lesson.title.toLowerCase().includes(lessonSearch.toLowerCase());
                return matchesSubject && matchesChapter && matchesSearch;
              }).length === 0 && (
                <div className="text-center py-12">
                  <BookMarked className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No lesson plans found</p>
                  <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 safe-area-bottom">
          <div className="flex items-center justify-around px-2 py-2 max-w-screen-sm mx-auto">
            {/* Menu Button */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[70px] active:opacity-60 transition-opacity">
                  <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
                  <span className="text-[11px] font-medium text-gray-700">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex flex-col gap-3 mt-8">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">S</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Student</h3>
                      <p className="text-xs text-gray-500">Grade 1</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/profile-settings')}
                    className="justify-start"
                  >
                    Profile Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Resources Button */}
            <button 
              onClick={() => setActiveTab('resources')}
              className="flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[70px] active:opacity-60 transition-opacity"
            >
              <BookOpen 
                className={cn(
                  "w-6 h-6 transition-colors",
                  activeTab === 'resources' ? "text-blue-600" : "text-gray-700"
                )} 
                strokeWidth={2}
              />
              <span className={cn(
                "text-[11px] font-medium transition-colors",
                activeTab === 'resources' ? "text-blue-600" : "text-gray-700"
              )}>
                Resources
              </span>
            </button>

            {/* Home Button */}
            <button 
              onClick={() => setActiveTab('home')}
              className="flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[70px] active:opacity-60 transition-opacity"
            >
              <Home 
                className={cn(
                  "w-6 h-6 transition-colors",
                  activeTab === 'home' ? "text-blue-600" : "text-gray-700"
                )} 
                strokeWidth={2}
                fill={activeTab === 'home' ? "currentColor" : "none"}
              />
              <span className={cn(
                "text-[11px] font-medium transition-colors",
                activeTab === 'home' ? "text-blue-600" : "text-gray-700"
              )}>
                Home
              </span>
            </button>

            {/* Assessments Button */}
            <button 
              onClick={() => setActiveTab('assessments')}
              className="flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[70px] active:opacity-60 transition-opacity"
            >
              <ClipboardList 
                className={cn(
                  "w-6 h-6 transition-colors",
                  activeTab === 'assessments' ? "text-blue-600" : "text-gray-700"
                )} 
                strokeWidth={2}
              />
              <span className={cn(
                "text-[11px] font-medium transition-colors",
                activeTab === 'assessments' ? "text-blue-600" : "text-gray-700"
              )}>
                Tests
              </span>
            </button>

            {/* Lessons Button */}
            <button 
              onClick={() => setActiveTab('lessons')}
              className="flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[70px] active:opacity-60 transition-opacity"
            >
              <BookMarked 
                className={cn(
                  "w-6 h-6 transition-colors",
                  activeTab === 'lessons' ? "text-blue-600" : "text-gray-700"
                )} 
                strokeWidth={2}
              />
              <span className={cn(
                "text-[11px] font-medium transition-colors",
                activeTab === 'lessons' ? "text-blue-600" : "text-gray-700"
              )}>
                Lessons
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
