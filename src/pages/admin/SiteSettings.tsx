import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, EyeOff, Edit2, Trash2, Save } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { Switch } from '@/components/ui/switch';
import { SiteContent } from '@/data/siteContent';

type SiteSettingsPage = 'about' | 'contact' | 'privacy' | 'terms';

export default function SiteSettings() {
  const { 
    siteContent, 
    saveSiteContentToStorage, 
    updatePageSettings,
    toggleItemVisibility,
    deleteSiteItem,
    addSiteItem,
    updateSiteItem
  } = useAdmin();
  
  const [activePage, setActivePage] = useState<SiteSettingsPage>('about');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemData, setEditingItemData] = useState<any>(null);

  const handleEditItem = (item: any) => {
    setEditingItemId(item.id);
    setEditingItemData({ ...item });
  };

  const handleSaveItem = (page: SiteSettingsPage, arrayName: string) => {
    if (!editingItemData) return;
    updateSiteItem(page, arrayName, editingItemId!, editingItemData);
    setEditingItemId(null);
    setEditingItemData(null);
  };

  const handleSaveAll = () => {
    saveSiteContentToStorage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-light mb-1">Site Settings</h1>
          <p className="text-muted-foreground text-xs md:text-sm">Manage page content</p>
        </div>
        <GalaxyButton onClick={handleSaveAll} size="sm">
          <Save className="w-4 h-4" />
          Save All Changes
        </GalaxyButton>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['about', 'contact', 'privacy', 'terms'] as SiteSettingsPage[]).map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${
              activePage === page
                ? 'glass-button text-primary'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {page === 'privacy' ? 'Privacy Policy' : page === 'terms' ? 'Terms of Service' : page}
          </button>
        ))}
      </div>

      {/* About Page Settings */}
      {activePage === 'about' && (
        <div className="space-y-4">
          {/* Page Settings */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Page Settings</h3>
              <Switch
                checked={siteContent.about.settings.isPublished}
                onCheckedChange={(checked) => updatePageSettings('about', 'isPublished', checked)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Page Title</label>
                <input
                  type="text"
                  value={siteContent.about.settings.pageTitle}
                  onChange={(e) => updatePageSettings('about', 'pageTitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Subtitle</label>
                <input
                  type="text"
                  value={siteContent.about.settings.pageSubtitle}
                  onChange={(e) => updatePageSettings('about', 'pageSubtitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Statistics</h3>
              <button
                onClick={() => addSiteItem('about', 'stats', { value: '0', label: 'New Stat', isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {siteContent.about.stats.map((stat) => (
                <div key={stat.id} className={`glass p-3 rounded-lg ${!stat.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === stat.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItemData?.value || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, value: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-sm"
                        placeholder="50+"
                      />
                      <input
                        type="text"
                        value={editingItemData?.label || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, label: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs"
                        placeholder="Projects"
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSaveItem('about', 'stats')}
                          className="flex-1 p-1 bg-primary/20 text-primary rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => { setEditingItemId(null); setEditingItemData(null); }}
                          className="flex-1 p-1 glass-button rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <div className="flex gap-1 mt-2">
                        <button onClick={() => handleEditItem(stat)} className="p-1 glass-button rounded">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => toggleItemVisibility('about', 'stats', stat.id)} className="p-1 glass-button rounded">
                          {stat.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('about', 'stats', stat.id)} className="p-1 hover:bg-destructive/20 text-destructive rounded">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Values</h3>
              <button
                onClick={() => addSiteItem('about', 'values', { icon: 'Star', title: 'New Value', description: 'Description here', isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {siteContent.about.values.map((value) => (
                <div key={value.id} className={`glass p-3 rounded-lg ${!value.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === value.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItemData?.title || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, title: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-sm"
                        placeholder="Title"
                      />
                      <textarea
                        value={editingItemData?.description || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, description: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs resize-none"
                        rows={2}
                        placeholder="Description"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleSaveItem('about', 'values')} className="flex-1 p-1 bg-primary/20 text-primary rounded text-xs">Save</button>
                        <button onClick={() => { setEditingItemId(null); setEditingItemData(null); }} className="flex-1 p-1 glass-button rounded text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{value.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{value.description}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => handleEditItem(value)} className="p-1.5 glass-button rounded"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => toggleItemVisibility('about', 'values', value.id)} className="p-1.5 glass-button rounded">
                          {value.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('about', 'values', value.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Team Members</h3>
              <button
                onClick={() => addSiteItem('about', 'team', { name: 'New Member', role: 'Role', image: 'linear-gradient(135deg, hsl(260 80% 40%) 0%, hsl(200 70% 50%) 100%)', isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {siteContent.about.team.map((member) => (
                <div key={member.id} className={`glass p-3 rounded-lg text-center ${!member.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === member.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItemData?.name || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, name: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-sm"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={editingItemData?.role || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, role: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs"
                        placeholder="Role"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleSaveItem('about', 'team')} className="flex-1 p-1 bg-primary/20 text-primary rounded text-xs">Save</button>
                        <button onClick={() => { setEditingItemId(null); setEditingItemData(null); }} className="flex-1 p-1 glass-button rounded text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: member.image }} />
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                      <div className="flex justify-center gap-1 mt-2">
                        <button onClick={() => handleEditItem(member)} className="p-1 glass-button rounded"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => toggleItemVisibility('about', 'team', member.id)} className="p-1 glass-button rounded">
                          {member.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('about', 'team', member.id)} className="p-1 hover:bg-destructive/20 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Page Settings */}
      {activePage === 'contact' && (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Page Settings</h3>
              <Switch
                checked={siteContent.contact.settings.isPublished}
                onCheckedChange={(checked) => updatePageSettings('contact', 'isPublished', checked)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Page Title</label>
                <input
                  type="text"
                  value={siteContent.contact.settings.pageTitle}
                  onChange={(e) => updatePageSettings('contact', 'pageTitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Subtitle</label>
                <input
                  type="text"
                  value={siteContent.contact.settings.pageSubtitle}
                  onChange={(e) => updatePageSettings('contact', 'pageSubtitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Contact Information</h3>
              <button
                onClick={() => addSiteItem('contact', 'info', { icon: 'Mail', label: 'New', value: 'Value', href: '#', isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {siteContent.contact.info.map((info) => (
                <div key={info.id} className={`glass p-3 rounded-lg ${!info.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === info.id ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingItemData?.label || ''}
                          onChange={(e) => setEditingItemData({ ...editingItemData, label: e.target.value })}
                          className="px-2 py-1 glass rounded text-sm"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={editingItemData?.value || ''}
                          onChange={(e) => setEditingItemData({ ...editingItemData, value: e.target.value })}
                          className="px-2 py-1 glass rounded text-sm"
                          placeholder="Value"
                        />
                      </div>
                      <input
                        type="text"
                        value={editingItemData?.href || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, href: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs"
                        placeholder="Link (mailto:, tel:, etc.)"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleSaveItem('contact', 'info')} className="px-3 py-1 bg-primary/20 text-primary rounded text-xs">Save</button>
                        <button onClick={() => { setEditingItemId(null); setEditingItemData(null); }} className="px-3 py-1 glass-button rounded text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        <p className="font-medium text-sm truncate">{info.value}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => handleEditItem(info)} className="p-1.5 glass-button rounded"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => toggleItemVisibility('contact', 'info', info.id)} className="p-1.5 glass-button rounded">
                          {info.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('contact', 'info', info.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">FAQs</h3>
              <button
                onClick={() => addSiteItem('contact', 'faqs', { question: 'New Question?', answer: 'Answer here', isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {siteContent.contact.faqs.map((faq) => (
                <div key={faq.id} className={`glass p-3 rounded-lg ${!faq.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === faq.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItemData?.question || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, question: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-sm"
                        placeholder="Question"
                      />
                      <textarea
                        value={editingItemData?.answer || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, answer: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs resize-none"
                        rows={3}
                        placeholder="Answer"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleSaveItem('contact', 'faqs')} className="px-3 py-1 bg-primary/20 text-primary rounded text-xs">Save</button>
                        <button onClick={() => { setEditingItemId(null); setEditingItemData(null); }} className="px-3 py-1 glass-button rounded text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{faq.question}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{faq.answer}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => handleEditItem(faq)} className="p-1.5 glass-button rounded"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => toggleItemVisibility('contact', 'faqs', faq.id)} className="p-1.5 glass-button rounded">
                          {faq.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('contact', 'faqs', faq.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Page Settings */}
      {activePage === 'privacy' && (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Page Settings</h3>
              <Switch
                checked={siteContent.privacy.settings.isPublished}
                onCheckedChange={(checked) => updatePageSettings('privacy', 'isPublished', checked)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Page Title</label>
                <input
                  type="text"
                  value={siteContent.privacy.settings.pageTitle}
                  onChange={(e) => updatePageSettings('privacy', 'pageTitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Subtitle</label>
                <input
                  type="text"
                  value={siteContent.privacy.settings.pageSubtitle}
                  onChange={(e) => updatePageSettings('privacy', 'pageSubtitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Privacy Sections</h3>
              <button
                onClick={() => addSiteItem('privacy', 'sections', { title: 'New Section', content: 'Content here', order: siteContent.privacy.sections.length + 1, isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {siteContent.privacy.sections.map((section) => (
                <div key={section.id} className={`glass p-3 rounded-lg ${!section.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === section.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItemData?.title || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, title: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-sm"
                        placeholder="Section title"
                      />
                      <textarea
                        value={editingItemData?.content || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, content: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs resize-none"
                        rows={4}
                        placeholder="Content"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleSaveItem('privacy', 'sections')} className="px-3 py-1 bg-primary/20 text-primary rounded text-xs">Save</button>
                        <button onClick={() => { setEditingItemId(null); setEditingItemData(null); }} className="px-3 py-1 glass-button rounded text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{section.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{section.content}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => handleEditItem(section)} className="p-1.5 glass-button rounded"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => toggleItemVisibility('privacy', 'sections', section.id)} className="p-1.5 glass-button rounded">
                          {section.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('privacy', 'sections', section.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Terms Page Settings */}
      {activePage === 'terms' && (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Page Settings</h3>
              <Switch
                checked={siteContent.terms.settings.isPublished}
                onCheckedChange={(checked) => updatePageSettings('terms', 'isPublished', checked)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Page Title</label>
                <input
                  type="text"
                  value={siteContent.terms.settings.pageTitle}
                  onChange={(e) => updatePageSettings('terms', 'pageTitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Subtitle</label>
                <input
                  type="text"
                  value={siteContent.terms.settings.pageSubtitle}
                  onChange={(e) => updatePageSettings('terms', 'pageSubtitle', e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary">Terms Sections</h3>
              <button
                onClick={() => addSiteItem('terms', 'sections', { title: 'New Section', content: 'Content here', order: siteContent.terms.sections.length + 1, isVisible: true })}
                className="p-1.5 glass-button rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {siteContent.terms.sections.map((section) => (
                <div key={section.id} className={`glass p-3 rounded-lg ${!section.isVisible ? 'opacity-50' : ''}`}>
                  {editingItemId === section.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItemData?.title || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, title: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-sm"
                        placeholder="Section title"
                      />
                      <textarea
                        value={editingItemData?.content || ''}
                        onChange={(e) => setEditingItemData({ ...editingItemData, content: e.target.value })}
                        className="w-full px-2 py-1 glass rounded text-xs resize-none"
                        rows={4}
                        placeholder="Content"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleSaveItem('terms', 'sections')} className="px-3 py-1 bg-primary/20 text-primary rounded text-xs">Save</button>
                        <button onClick={() => { setEditingItemId(null); setEditingItemData(null); }} className="px-3 py-1 glass-button rounded text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{section.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{section.content}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => handleEditItem(section)} className="p-1.5 glass-button rounded"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => toggleItemVisibility('terms', 'sections', section.id)} className="p-1.5 glass-button rounded">
                          {section.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                        <button onClick={() => deleteSiteItem('terms', 'sections', section.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
