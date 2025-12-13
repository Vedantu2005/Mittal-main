import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Edit2, Trash2, Image as ImageIcon, User, Upload, X,
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, Calendar, Save, Loader, Link as LinkIconSmall
} from 'lucide-react';

import Sidebar from './sidebar.jsx';

// FIREBASE IMPORTS
import { db } from '../../firebase'; 
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const BlogManager = ({ setIsAdminLoggedIn }) => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const blogsCollectionRef = collection(db, "blogs");

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    imageUrl: '',
    slug: '',
  });

  // Helper to create URL-friendly slug
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getDocs(blogsCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (showForm && editorRef.current) {
      editorRef.current.innerHTML = formData.content;
    }
  }, [showForm, editId]);

  // Update slug automatically when title changes (only if adding new)
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: !editId ? createSlug(newTitle) : prev.slug
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) { 
        alert("File is too big! Please use an image smaller than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalContent = editorRef.current ? editorRef.current.innerHTML : formData.content;
    const displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Use the slug from the form data, or fallback to auto-generated
    const finalSlug = formData.slug.trim() ? createSlug(formData.slug) : createSlug(formData.title);

    const blogData = { 
      ...formData, 
      content: finalContent,
      slug: finalSlug,
      date: displayDate,
      createdAt: serverTimestamp() 
    };

    try {
      if (editId) {
        const blogDoc = doc(db, "blogs", editId);
        await updateDoc(blogDoc, blogData);
        setBlogs(blogs.map(b => b.id === editId ? { ...blogData, id: editId } : b));
      } else {
        await addDoc(blogsCollectionRef, blogData);
        fetchBlogs();
      }
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ title: '', author: '', content: '', imageUrl: '', slug: '' });
    setImagePreview(null);
    setShowForm(false);
    setEditId(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setImagePreview(blog.imageUrl);
    setEditId(blog.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const blogDoc = doc(db, "blogs", id);
        await deleteDoc(blogDoc);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      setFormData({ ...formData, content: editorRef.current.innerHTML });
    }
  };

  const ToolbarBtn = ({ onClick, icon: Icon, title }) => (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="p-2 text-slate-500 hover:text-[#561C24] hover:bg-slate-200 rounded transition-colors cursor-pointer"
      title={title}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-slate-300 mx-1 self-center opacity-50" />;

  return (
    <div className="flex font-sans bg-[#FDFBF7] min-h-screen">
      <Sidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#561C24]">Blog Management</h1>
              <p className="text-slate-500 mt-1">Manage your articles and insights</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              disabled={loading}
              className="bg-[#561C24] hover:bg-[#3d141a] text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add Blog'}
            </button>
          </div>

          {loading && (
             <div className="text-center py-4 text-[#561C24] font-semibold animate-pulse flex justify-center gap-2 items-center">
                <Loader className="animate-spin" /> Processing Data...
             </div>
          )}

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-8 mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {editId ? <Edit2 size={24} className="text-[#561C24]" /> : <Plus size={24} className="text-[#561C24]" />}
                {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Blog Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#561C24]"
                        placeholder="e.g. The Future of Personal Branding"
                      />
                    </div>

                    {/* SLUG FIELD */}
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">
                        URL Slug (Editable)
                      </label>
                      <div className="flex items-center gap-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus-within:border-[#561C24]">
                        <LinkIconSmall size={16} className="text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          required
                          className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-mono"
                          placeholder="the-future-of-personal-branding"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">This will be the link: /blogs/{formData.slug || '...'}</p>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Author</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#561C24]"
                        placeholder="e.g. Sarthak Mittal"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Cover Image</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer bg-slate-50 border border-dashed border-slate-300 hover:border-[#561C24] rounded-lg p-3 flex items-center justify-center gap-2 transition-colors group">
                          <Upload size={20} className="text-slate-400 group-hover:text-[#561C24]" />
                          <span className="text-slate-500 group-hover:text-[#561C24]">Choose File</span>
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                        {imagePreview && (
                          <div className="w-20 h-16 bg-slate-100 rounded overflow-hidden shrink-0 border border-slate-200">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-red-500 mt-1">Note: Images must be under 1MB.</p>
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Content</label>
                      <div className="bg-slate-50 border border-slate-200 rounded-t-lg border-b-0">
                        <div className="flex flex-wrap items-center p-2 gap-1">
                          <ToolbarBtn onClick={() => execCommand('bold')} icon={Bold} title="Bold" />
                          <ToolbarBtn onClick={() => execCommand('italic')} icon={Italic} title="Italic" />
                          <ToolbarBtn onClick={() => execCommand('underline')} icon={Underline} title="Underline" />
                          <Divider />
                          <ToolbarBtn onClick={() => execCommand('insertUnorderedList')} icon={List} title="Unordered List" />
                          <ToolbarBtn onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Ordered List" />
                          <Divider />
                          <ToolbarBtn onClick={() => execCommand('justifyLeft')} icon={AlignLeft} title="Align Left" />
                          <ToolbarBtn onClick={() => execCommand('justifyCenter')} icon={AlignCenter} title="Align Center" />
                        </div>
                      </div>

                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={(e) => setFormData({ ...formData, content: e.currentTarget.innerHTML })}
                        className="w-full min-h-[150px] px-4 py-3 bg-white border border-slate-200 rounded-b-lg text-slate-800 focus:outline-none focus:border-[#561C24] font-sans text-sm leading-relaxed overflow-y-auto cursor-text"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#561C24] hover:bg-[#3d141a] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {loading ? 'Saving...' : (editId ? 'Update Blog' : 'Publish Blog')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No blog posts available in Database.</p>
              </div>
            )}

            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100 relative"
              >
                 {/* Admin Action Buttons */}
                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button onClick={() => handleEdit(blog)} className="bg-white/90 p-2 rounded-full shadow-md hover:text-[#561C24] cursor-pointer text-slate-600 transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(blog.id)} className="bg-white/90 p-2 rounded-full shadow-md hover:text-red-600 cursor-pointer text-slate-600 transition-colors"><Trash2 size={16} /></button>
                </div>

                {/* Image Section */}
                <div className="relative h-56 bg-slate-200">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon size={40} />
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#561C24]">
                     <Calendar size={14} />
                     <span className="uppercase tracking-wider">{blog.date}</span>
                  </div>

                  <h3 className="text-slate-900 font-bold text-xl leading-snug mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <div className="text-slate-500 text-xs font-mono mb-4 bg-slate-50 px-2 py-1 rounded w-fit">
                     /{blog.slug}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                     <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                        <User size={16} className="text-[#561C24]" />
                        <span>{blog.author}</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;