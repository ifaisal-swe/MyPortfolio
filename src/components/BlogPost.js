import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Tag, ArrowLeft, BookOpen } from 'lucide-react';
import { getBlogPostBySlug } from '../utils/blogLoader';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const blogPost = await getBlogPostBySlug(slug);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-gray-400">Loading post...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isRTL = post.rtl || false;

  return (
    <div className="min-h-screen bg-white py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Back Button */}
        <Link
          to="/blogs"
          className={`inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          Back to Blogs
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          
          <div className={`flex flex-wrap items-center gap-4 text-gray-600 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar className="w-5 h-5 text-green-600" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Tag className="w-5 h-5 text-green-600" />
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded border border-green-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.excerpt && (
            <p className={`text-xl text-gray-600 italic border-green-600 pl-4 pr-4 ${isRTL ? 'border-r-4' : 'border-l-4'}`}>
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Post Content */}
        <article className={`prose prose-lg max-w-none ${isRTL ? 'prose-rtl' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Style headings
              h1: ({node, children, ...props}) => <h1 className={`text-4xl font-bold text-gray-800 mt-8 mb-4 ${isRTL ? 'text-right' : 'text-left'}`} {...props}>{children}</h1>,
              h2: ({node, children, ...props}) => <h2 className={`text-3xl font-bold text-gray-800 mt-8 mb-4 ${isRTL ? 'text-right' : 'text-left'}`} {...props}>{children}</h2>,
              h3: ({node, children, ...props}) => <h3 className={`text-2xl font-bold text-gray-800 mt-6 mb-3 ${isRTL ? 'text-right' : 'text-left'}`} {...props}>{children}</h3>,
              h4: ({node, children, ...props}) => <h4 className={`text-xl font-bold text-gray-800 mt-4 mb-2 ${isRTL ? 'text-right' : 'text-left'}`} {...props}>{children}</h4>,
              
              // Style paragraphs
              p: ({node, ...props}) => <p className={`text-gray-700 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}`} {...props} />,
              
              // Style links
              a: ({node, children, ...props}) => (
                <a className="text-green-600 hover:text-green-700 underline" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
              ),
              
              // Style lists
              ul: ({node, ...props}) => <ul className={`list-disc mb-4 space-y-2 text-gray-700 ${isRTL ? 'list-inside pr-6' : 'list-inside pl-6'}`} {...props} />,
              ol: ({node, ...props}) => <ol className={`list-decimal mb-4 space-y-2 text-gray-700 ${isRTL ? 'list-inside pr-6' : 'list-inside pl-6'}`} {...props} />,
              li: ({node, ...props}) => <li className={isRTL ? 'mr-4' : 'ml-4'} {...props} />,
              
              // Style code blocks
              code: ({node, inline, ...props}) => {
                if (inline) {
                  return (
                    <code className="bg-gray-100 text-green-600 px-2 py-1 rounded text-sm font-mono" {...props} />
                  );
                }
                return (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm" {...props} />
                );
              },
              
              // Style pre (code block wrapper)
              pre: ({node, ...props}) => (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
              ),
              
              // Style blockquotes
              blockquote: ({node, ...props}) => (
                <blockquote className={`border-green-600 italic text-gray-600 my-4 ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'}`} {...props} />
              ),
              
              // Style horizontal rules
              hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
              
              // Style images
              img: ({node, alt, ...props}) => (
                <img className="rounded-lg my-4 max-w-full h-auto" alt={alt || ''} {...props} />
              ),
              
              // Style tables
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-300" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-bold text-left" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border border-gray-300 px-4 py-2" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/blogs"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <BookOpen className="w-4 h-4" />
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
