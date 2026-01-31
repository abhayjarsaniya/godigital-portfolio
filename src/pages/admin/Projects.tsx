import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Eye, EyeOff, Edit2, Trash2, X, ArrowLeft, Save,
  FileText, User, DollarSign, Building, Calendar, Clock
} from 'lucide-react';
import { useAdmin, Project, emptyProject, PLATFORM_OPTIONS, INDUSTRY_OPTIONS, STATUS_OPTIONS } from '@/contexts/AdminContext';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProjectView = 'list' | 'add' | 'edit' | 'view';

export default function Projects() {
  const { projects, deleteProject, toggleProjectVisibility, saveProject } = useAdmin();
  const [view, setView] = useState<ProjectView>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id' | 'createdAt'>>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [resultInput, setResultInput] = useState('');

  const handleSaveProject = () => {
    if (!projectForm.title) return;
    saveProject(projectForm, editingProjectId);
    setProjectForm(emptyProject);
    setEditingProjectId(null);
    setView('list');
  };

  const handleEditProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      clientName: project.clientName,
      clientEmail: project.clientEmail || '',
      clientPhone: project.clientPhone || '',
      clientCompany: project.clientCompany || '',
      industry: project.industry,
      platform: project.platform,
      description: project.description,
      technologies: project.technologies,
      features: project.features,
      results: project.results,
      imageUrl: project.imageUrl,
      salesName: project.salesName || '',
      projectValue: project.projectValue,
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      estimatedDuration: project.estimatedDuration || '',
      status: project.status,
      isVisible: project.isVisible ?? true,
    });
    setEditingProjectId(project.id);
    setView('edit');
  };

  const addArrayItem = (field: 'technologies' | 'features' | 'results', value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    setProjectForm(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
    setter('');
  };

  const removeArrayItem = (field: 'technologies' | 'features' | 'results', index: number) => {
    setProjectForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Project List View
  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 md:space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-light mb-1">Projects</h1>
            <p className="text-muted-foreground text-xs md:text-sm">Manage your project portfolio</p>
          </div>
          <GalaxyButton onClick={() => { setProjectForm(emptyProject); setEditingProjectId(null); setView('add'); }} size="sm">
            <Plus className="w-4 h-4" />
            Add Project
          </GalaxyButton>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Project</TableHead>
                  <TableHead className="hidden md:table-cell text-xs">Client</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs">Status</TableHead>
                  <TableHead className="hidden lg:table-cell text-xs">Platform</TableHead>
                  <TableHead className="text-right text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} className={!project.isVisible ? 'opacity-50' : ''}>
                    <TableCell className="font-medium text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded flex-shrink-0"
                          style={{ 
                            background: project.imageUrl?.startsWith('linear-gradient') 
                              ? project.imageUrl 
                              : `url(${project.imageUrl}) center/cover`
                          }}
                        />
                        <span className="truncate max-w-[120px] sm:max-w-[200px]">{project.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {project.clientName || project.clientCompany || '-'}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${STATUS_OPTIONS.find(s => s.value === project.status)?.color}20`,
                          color: STATUS_OPTIONS.find(s => s.value === project.status)?.color
                        }}
                      >
                        {STATUS_OPTIONS.find(s => s.value === project.status)?.label}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-xs capitalize">
                      {project.platform?.replace('-', ' ')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setSelectedProject(project); setView('view'); }}
                          className="p-1.5 glass-button rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleProjectVisibility(project.id)}
                          className="p-1.5 glass-button rounded-lg"
                        >
                          {project.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-1.5 glass-button rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-1.5 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    );
  }

  // Project View Detail
  if (view === 'view' && selectedProject) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 md:space-y-6"
      >
        <div className="flex items-center gap-3">
          <button onClick={() => setView('list')} className="p-2 glass-button rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-light truncate">{selectedProject.title}</h1>
            <p className="text-muted-foreground text-xs md:text-sm">{selectedProject.clientName || selectedProject.clientCompany}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4 md:p-6 space-y-6">
          <div 
            className="w-full h-32 md:h-48 rounded-lg"
            style={{ 
              background: selectedProject.imageUrl?.startsWith('linear-gradient') 
                ? selectedProject.imageUrl 
                : `url(${selectedProject.imageUrl}) center/cover`
            }}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <span 
                className="text-xs px-2 py-1 rounded inline-block"
                style={{ 
                  backgroundColor: `${STATUS_OPTIONS.find(s => s.value === selectedProject.status)?.color}20`,
                  color: STATUS_OPTIONS.find(s => s.value === selectedProject.status)?.color
                }}
              >
                {STATUS_OPTIONS.find(s => s.value === selectedProject.status)?.label}
              </span>
            </div>
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Platform</p>
              <p className="text-sm capitalize">{selectedProject.platform?.replace('-', ' ')}</p>
            </div>
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Industry</p>
              <p className="text-sm">{selectedProject.industry}</p>
            </div>
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Value</p>
              <p className="text-sm">₹{selectedProject.projectValue?.toLocaleString('en-IN') || '-'}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{selectedProject.description || 'No description'}</p>
          </div>
          
          {selectedProject.technologies?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 glass text-primary rounded-full text-xs">{tech}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border/30">
            <button
              onClick={() => handleEditProject(selectedProject)}
              className="px-4 py-2 glass-button rounded-lg flex items-center justify-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => { deleteProject(selectedProject.id); setView('list'); }}
              className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg flex items-center justify-center gap-2 hover:bg-destructive/30 transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Add/Edit Project Form
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setView('list')} className="p-2 glass-button rounded-lg">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-light">
            {editingProjectId ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm">Fill in the project details</p>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 md:p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Project Title *</label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="My Awesome Project"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Status</label>
              <select
                value={projectForm.status}
                onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div>
          <h3 className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            Client Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Client Name</label>
              <input
                type="text"
                value={projectForm.clientName}
                onChange={(e) => setProjectForm(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <input
                type="email"
                value={projectForm.clientEmail}
                onChange={(e) => setProjectForm(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="john@example.com"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Phone</label>
              <input
                type="tel"
                value={projectForm.clientPhone}
                onChange={(e) => setProjectForm(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Company</label>
              <input
                type="text"
                value={projectForm.clientCompany}
                onChange={(e) => setProjectForm(prev => ({ ...prev, clientCompany: e.target.value }))}
                placeholder="TechCorp Inc."
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Sales & Timeline */}
        <div>
          <h3 className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Sales & Timeline
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Sales Person</label>
              <input
                type="text"
                value={projectForm.salesName}
                onChange={(e) => setProjectForm(prev => ({ ...prev, salesName: e.target.value }))}
                placeholder="Sales rep"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Value ₹</label>
              <input
                type="number"
                value={projectForm.projectValue || ''}
                onChange={(e) => setProjectForm(prev => ({ ...prev, projectValue: e.target.value ? Number(e.target.value) : undefined }))}
                placeholder="15000"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Duration</label>
              <input
                type="text"
                value={projectForm.estimatedDuration}
                onChange={(e) => setProjectForm(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                placeholder="2 weeks"
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Start Date</label>
              <input
                type="date"
                value={projectForm.startDate}
                onChange={(e) => setProjectForm(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">End Date</label>
              <input
                type="date"
                value={projectForm.endDate}
                onChange={(e) => setProjectForm(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-2 flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch
                  checked={projectForm.isVisible}
                  onCheckedChange={(checked) => setProjectForm(prev => ({ ...prev, isVisible: checked }))}
                />
                <span className="text-sm text-muted-foreground">Visible</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Classification */}
        <div>
          <h3 className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Classification
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Platform</label>
              <select
                value={projectForm.platform}
                onChange={(e) => setProjectForm(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="">Select platform...</option>
                {PLATFORM_OPTIONS.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ')}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Industry</label>
              <select
                value={projectForm.industry}
                onChange={(e) => setProjectForm(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="">Select industry...</option>
                {INDUSTRY_OPTIONS.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Description</label>
          <textarea
            value={projectForm.description}
            onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the project..."
            rows={3}
            className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Image URL / Gradient</label>
          <input
            type="text"
            value={projectForm.imageUrl}
            onChange={(e) => setProjectForm(prev => ({ ...prev, imageUrl: e.target.value }))}
            placeholder="https://example.com/image.jpg or linear-gradient(...)"
            className="w-full px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
        
        {/* Technologies */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Technologies</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('technologies', techInput, setTechInput))}
              placeholder="Add technology..."
              className="flex-1 px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button
              type="button"
              onClick={() => addArrayItem('technologies', techInput, setTechInput)}
              className="px-3 py-2 glass-button rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {projectForm.technologies.map((tech, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 glass text-primary rounded-full text-xs">
                {tech}
                <button onClick={() => removeArrayItem('technologies', i)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Key Features</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('features', featureInput, setFeatureInput))}
              placeholder="Add feature..."
              className="flex-1 px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button
              type="button"
              onClick={() => addArrayItem('features', featureInput, setFeatureInput)}
              className="px-3 py-2 glass-button rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {projectForm.features.map((feature, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 glass text-muted-foreground rounded-full text-xs">
                {feature}
                <button onClick={() => removeArrayItem('features', i)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Results / Impact</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={resultInput}
              onChange={(e) => setResultInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('results', resultInput, setResultInput))}
              placeholder="Add result..."
              className="flex-1 px-3 py-2.5 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button
              type="button"
              onClick={() => addArrayItem('results', resultInput, setResultInput)}
              className="px-3 py-2 glass-button rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {projectForm.results.map((result, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 glass text-success rounded-full text-xs">
                {result}
                <button onClick={() => removeArrayItem('results', i)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border/30">
          <button
            onClick={() => setView('list')}
            className="px-4 py-2 glass-button rounded-lg text-sm"
          >
            Cancel
          </button>
          <GalaxyButton 
            onClick={handleSaveProject}
            disabled={!projectForm.title}
            size="sm"
          >
            <Save className="w-4 h-4" />
            {editingProjectId ? 'Update Project' : 'Save Project'}
          </GalaxyButton>
        </div>
      </div>
    </motion.div>
  );
}
