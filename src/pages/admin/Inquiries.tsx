import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Eye, Trash2, X, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { useAdmin, Inquiry } from '@/contexts/AdminContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Inquiries() {
  const { inquiries, deleteInquiry } = useAdmin();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-6"
    >
      <div>
        <h1 className="text-xl md:text-2xl font-light mb-1">Inquiries</h1>
        <p className="text-muted-foreground text-xs md:text-sm">Manage contact form submissions</p>
      </div>
      
      {inquiries.length === 0 ? (
        <div className="glass-card rounded-xl p-8 md:p-12 text-center">
          <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No inquiries yet</p>
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="hidden md:table-cell text-xs">Email</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs">Type</TableHead>
                  <TableHead className="hidden lg:table-cell text-xs">Date</TableHead>
                  <TableHead className="text-right text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium text-sm">{inquiry.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{inquiry.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {inquiry.projectTypeLabel || inquiry.projectType}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-1.5 glass-button rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
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
      )}

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card rounded-xl p-4 md:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-light">{selectedInquiry.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedInquiry.projectTypeLabel || selectedInquiry.projectType}</p>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 glass-button rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-sm hover:text-primary break-all">
                    {selectedInquiry.email}
                  </a>
                </div>
                
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-3 p-3 glass rounded-lg">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`tel:${selectedInquiry.phone}`} className="text-sm hover:text-primary">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                
                <div className="p-3 glass rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Message</span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedInquiry.message || 'No message provided'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
                <button
                  onClick={() => {
                    deleteInquiry(selectedInquiry.id);
                    setSelectedInquiry(null);
                  }}
                  className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg flex items-center gap-2 hover:bg-destructive/30 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
