export interface Author {
  name: string;
  avatar?: string;
  role?: string;
}

export interface ReactionRecord {
  userId: string;
  userName: string;
  type: 'like' | 'love' | 'quantum';
  timestamp: string;
}

export interface Comment {
  id: string;
  blogId?: string; 
  author: Author;
  content: string;
  date: string;
  platform: 'website' | 'medium';
  avatar?: string;
}


export interface BlogPost {
  id: string;
  source: 'local' | 'medium';
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
  link?: string;
  comments: Comment[];
  reactions: ReactionRecord[];
}

export interface StaticBlogPost extends Omit<BlogPost, 'comments' | 'reactions'> {
  initialComments: Comment[];
  initialReactions: {
    likes: number;
    hearts: number;
    quantum: number;
  };
}