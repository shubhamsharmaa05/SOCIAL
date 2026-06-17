import { useState, useRef } from "react";
import { 
  Box, Typography, Button, Card, Tabs, Tab,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton,
  Chip, Divider,
  List, ListItem, ListItemAvatar, ListItemText, Avatar
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GridOnIcon from "@mui/icons-material/GridOn";
import MovieIcon from "@mui/icons-material/Movie";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
// FullCalendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const initialItems = [
  { id: 1, type: "image", title: "Product Hero", score: "98%", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop", status: "published", description: "Introducing our new flagship product. The perfect blend of design and performance.", hashtags: ["#product", "#design", "#launch"] },
  { id: 2, type: "video", title: "Demo Reel", score: "95%", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop", status: "scheduled", date: "2026-06-18", description: "Watch how our system automates your entire workflow in seconds.", hashtags: ["#demo", "#automation", "#software"] },
  { id: 3, type: "image", title: "Social Post 1", score: "92%", url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop", status: "published", description: "Happy Monday! Let's crush our goals this week.", hashtags: ["#mondaymotivation", "#goals"] },
  { id: 4, type: "image", title: "Logo Pack", score: "89%", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", status: "draft", description: "Updated brand assets and logo variations for Q3.", hashtags: ["#branding", "#design"] },
  { id: 5, type: "video", title: "Testimonial", score: "96%", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop", status: "scheduled", date: "2026-06-20", description: "See what our top clients have to say about the recent update.", hashtags: ["#testimonial", "#success"] },
  { id: 6, type: "image", title: "Banner Ad", score: "91%", url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop", status: "scheduled", date: "2026-06-22", description: "Summer sale banner ad creative.", hashtags: ["#sale", "#summer"] },
  { id: 7, type: "video", title: "Tutorial", score: "94%", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop", status: "draft", description: "Step by step guide on setting up your first project.", hashtags: ["#tutorial", "#guide"] },
  { id: 8, type: "image", title: "Infographic", score: "88%", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop", status: "draft", description: "Industry stats and growth metrics for 2026.", hashtags: ["#stats", "#growth"] },
  { id: 9, type: "image", title: "Story Template", score: "97%", url: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&h=600&fit=crop", status: "scheduled", date: "2026-06-25", description: "Interactive poll template for Instagram stories.", hashtags: ["#stories", "#engagement"] },
  { id: 10, type: "video", title: "Behind the Scenes", score: "99%", url: "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?w=600&h=600&fit=crop", status: "scheduled", date: "2026-06-28", description: "A quick look at how our team builds these features.", hashtags: ["#bts", "#team"] },
  { id: 11, type: "image", title: "Product Flatlay", score: "93%", url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop", status: "published", description: "Aesthetic flatlay of the new collection.", hashtags: ["#aesthetic", "#collection"] },
  { id: 12, type: "image", title: "Lifestyle Shot", score: "95%", url: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=600&fit=crop", status: "published", description: "Living the dream with our latest gear.", hashtags: ["#lifestyle", "#gear"] },
];

const ContentVault = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [assets, setAssets] = useState(initialItems);
  
  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState("image");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Detail Modal State
  const [viewItem, setViewItem] = useState(null);
  
  // Inline Edit State
  const [inlineEdit, setInlineEdit] = useState(false);
  const [inlineDesc, setInlineDesc] = useState("");
  const [inlineHashtags, setInlineHashtags] = useState("");
  const [inlineDate, setInlineDate] = useState("");
  const [inlineTime, setInlineTime] = useState("");

  const handleOpenDetail = (item) => {
    setInlineDesc(item.description || "");
    setInlineHashtags(item.hashtags ? item.hashtags.join(" ") : "");
    setInlineDate(item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0]);
    setInlineTime(item.date && item.date.includes('T') ? item.date.split('T')[1].substring(0, 5) : "12:00");
    setInlineEdit(false);
    setViewItem(item);
  };

  // Summary List Modal State
  const [isSummaryListOpen, setIsSummaryListOpen] = useState(false);
  const [summaryListTitle, setSummaryListTitle] = useState("");
  const [summaryListItems, setSummaryListItems] = useState([]);

  const filteredItems = assets.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "images") return item.type === "image";
    if (activeTab === "videos") return item.type === "video";
    return true;
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Auto-detect type
      if (file.type.startsWith("video/")) {
        setUploadType("video");
      } else {
        setUploadType("image");
      }
      
      // Auto-fill title if empty
      if (!uploadTitle) {
        setUploadTitle(file.name.split('.')[0]);
      }
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile || !uploadTitle) return;

    const newAsset = {
      id: Date.now(),
      type: uploadType,
      title: uploadTitle,
      score: "New",
      url: previewUrl, 
      status: "draft",
      description: "No description provided.",
      hashtags: ["#new"],
    };

    setAssets([newAsset, ...assets]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsUploadOpen(false);
    setUploadTitle("");
    setUploadType("image");
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Summary Data
  const totalUploaded = assets.length;
  const publishedCount = assets.filter(a => a.status === 'published').length;
  const scheduledAssets = assets.filter(a => a.status === 'scheduled');
  const scheduledCount = scheduledAssets.length;
  
  // Find furthest scheduled date
  const sortedDates = scheduledAssets.map(a => new Date(a.date)).sort((a, b) => b - a);
  const furthestDate = sortedDates.length > 0 ? sortedDates[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'None';

  // Calendar Events
  const calendarEvents = assets
    .filter(a => a.status === 'scheduled' || a.status === 'published')
    .map(a => ({
      id: a.id,
      title: a.title,
      start: a.date || new Date().toISOString().split('T')[0], // Mock current date if published without date
      color: a.status === 'published' ? '#10B981' : '#3B82F6', // Emerald for published, Blue for scheduled
    }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%", width: "100%", maxWidth: 1400, mx: "auto" }}>
      {/* Header Area */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Content Pipeline
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your centralized hub for marketing assets and schedule.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={() => setIsUploadOpen(true)}
          >
            Upload Asset
          </Button>
        </Box>
      </Box>

      {/* Summary Stats */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        <Card 
          onClick={() => { setSummaryListTitle("Total Uploaded Assets"); setSummaryListItems(assets); setIsSummaryListOpen(true); }}
          sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
        >
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
            <CloudUploadIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">Total Uploaded</Typography>
            <Typography variant="h5" fontWeight="bold">{totalUploaded} Assets</Typography>
          </Box>
        </Card>
        
        <Card 
          onClick={() => { setSummaryListTitle("Published Assets"); setSummaryListItems(assets.filter(a => a.status === 'published')); setIsSummaryListOpen(true); }}
          sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
        >
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
            <CheckCircleIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">Published</Typography>
            <Typography variant="h5" fontWeight="bold">{publishedCount} Assets</Typography>
          </Box>
        </Card>

        <Card 
          onClick={() => { setSummaryListTitle("Scheduled Assets"); setSummaryListItems(scheduledAssets); setIsSummaryListOpen(true); }}
          sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
        >
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
            <ScheduleIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">Scheduled</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>{scheduledCount} <Typography component="span" variant="body2" color="text.secondary">till {furthestDate}</Typography></Typography>
          </Box>
        </Card>
      </Box>

      {/* Content Area - Split View */}
      <Box sx={{ flex: 1, display: "flex", gap: 3, overflow: "hidden", pb: 4 }}>
        
        {/* Left Side: Calendar View */}
        <Box sx={{ flex: 2, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <Card sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Box sx={{ 
              flex: 1,
              "& .fc-theme-standard td, & .fc-theme-standard th": { borderColor: "rgba(255,255,255,0.08)" },
              "& .fc-col-header-cell": { p: 1, bgcolor: "rgba(0,0,0,0.2)" },
              "& .fc-daygrid-day-number": { color: "text.secondary", p: 1 },
              "& .fc-event": { cursor: "pointer", border: "none", borderRadius: 1, p: 0.5, mb: 0.5, color: "white" },
              "& .fc-toolbar-title": { fontSize: "1.25rem", color: "text.primary" },
              "& .fc-button-primary": { bgcolor: "#3B82F6", borderColor: "#3B82F6" },
              "& .fc-button-primary:hover": { bgcolor: "#2563EB", borderColor: "#2563EB" },
            }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,timeGridDay'
                }}
                height="100%"
                eventClick={(info) => {
                  const eventId = parseInt(info.event.id);
                  const item = assets.find(a => a.id === eventId);
                  if (item) handleOpenDetail(item);
                }}
              />
            </Box>
          </Card>
        </Box>

        {/* Right Side: Grid View */}
        <Box sx={{ flex: 1, minWidth: 350, display: "flex", flexDirection: "column", bgcolor: "#111827", borderRadius: 3, border: "1px solid rgba(255, 255, 255, 0.08)", overflow: "hidden" }}>
          {/* Instagram Style Tabs for Grid */}
          <Box sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", bgcolor: "rgba(0,0,0,0.2)" }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              centered
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                minHeight: 52,
                "& .MuiTab-root": {
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "1px",
                  minHeight: 52,
                  color: "text.secondary",
                  "&.Mui-selected": {
                    color: "text.primary",
                  }
                }
              }}
            >
              <Tab icon={<GridOnIcon sx={{ fontSize: 16, mr: 0.5 }} />} iconPosition="start" label="All" value="all" disableRipple />
              <Tab icon={<AutoAwesomeIcon sx={{ fontSize: 16, mr: 0.5 }} />} iconPosition="start" label="Images" value="images" disableRipple />
              <Tab icon={<MovieIcon sx={{ fontSize: 16, mr: 0.5 }} />} iconPosition="start" label="Reels" value="videos" disableRipple />
            </Tabs>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            <Box 
              sx={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr)", 
                gap: "4px",
                width: "100%"
              }}
            >
              {filteredItems.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    bgcolor: "grey.900",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover .hover-overlay": { opacity: 1 },
                    "&:hover .hover-content": { opacity: 1 },
                  }}
                >
                  <Box
                    component={item.type === 'video' ? 'video' : 'img'}
                    src={item.url}
                    alt={item.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  {/* Badges Indicator (Top Right) */}
                  <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", alignItems: "center", gap: 0.5, zIndex: 3 }}>
                    <Chip 
                      label={item.status} 
                      size="small" 
                      sx={{ 
                        height: 20, fontSize: "0.65rem", fontWeight: "bold", textTransform: "capitalize",
                        bgcolor: item.status === 'published' ? '#10B981' : item.status === 'scheduled' ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                        color: "white",
                        backdropFilter: "blur(4px)"
                      }} 
                    />
                    {item.type === 'video' && (
                      <MovieIcon sx={{ color: "white", fontSize: 18, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }} />
                    )}
                  </Box>

                  {/* Hover Overlay */}
                  <Box
                    className="hover-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      opacity: 0,
                      transition: "opacity 0.2s ease",
                      zIndex: 1,
                    }}
                  />

                  {/* Hover Content Details */}
                  <Box
                    className="hover-content"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      opacity: 0,
                      transition: "opacity 0.2s ease",
                      zIndex: 2,
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold" color="white" sx={{ textAlign: "center", px: 1, lineHeight: 1.2 }}>
                      {item.title}
                    </Typography>
                    {item.type === 'video' && (
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <PlayArrowIcon sx={{ color: "white", fontSize: 20 }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Upload Modal */}
      <Dialog 
        open={isUploadOpen} 
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            width: "100%",
            maxWidth: 500,
          }
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Upload Asset</Typography>
          <IconButton onClick={handleCloseModal} size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          <input
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          
          {!previewUrl ? (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: "2px dashed rgba(255,255,255,0.2)",
                borderRadius: 2,
                p: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: "rgba(0,0,0,0.2)",
                transition: "all 0.2s",
                "&:hover": { borderColor: "primary.main", bgcolor: "rgba(59, 130, 246, 0.05)" }
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
              <Typography variant="body1" fontWeight="medium">Click to browse or drag file here</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Supports JPG, PNG, MP4</Typography>
            </Box>
          ) : (
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 2, overflow: "hidden", bgcolor: "black" }}>
              <Box
                component={uploadType === "video" ? "video" : "img"}
                src={previewUrl}
                controls={uploadType === "video"}
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <Button 
                variant="contained" 
                color="error" 
                size="small" 
                sx={{ position: "absolute", top: 8, right: 8, minWidth: "auto", p: 1 }}
                onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
          )}

          <TextField
            label="Asset Title"
            variant="outlined"
            fullWidth
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          
          <TextField
            select
            label="Asset Type"
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          >
            <MenuItem value="image">Image / Photo</MenuItem>
            <MenuItem value="video">Reel / Video</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseModal} color="inherit" sx={{ fontWeight: "bold" }}>Cancel</Button>
          <Button 
            onClick={handleUploadSubmit} 
            variant="contained" 
            color="primary" 
            disabled={!selectedFile || !uploadTitle}
            sx={{ fontWeight: "bold", px: 4 }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detail View Modal */}
      <Dialog 
        open={Boolean(viewItem)} 
        onClose={() => setViewItem(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            overflow: "hidden"
          }
        }}
      >
        {viewItem && (
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: 400 }}>
            {/* Left Media Area */}
            <Box sx={{ flex: 3, bgcolor: "black", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box
                component={viewItem.type === 'video' ? 'video' : 'img'}
                src={viewItem.url}
                controls={viewItem.type === 'video'}
                autoPlay={viewItem.type === 'video'}
                sx={{ width: "100%", maxHeight: 600, objectFit: "contain" }}
              />
              {/* Status Overlay on Media */}
              <Chip 
                label={viewItem.status}
                sx={{ 
                  position: "absolute", top: 16, right: 16, 
                  fontWeight: "bold", textTransform: "capitalize", zIndex: 10,
                  bgcolor: viewItem.status === 'published' ? '#10B981' : viewItem.status === 'scheduled' ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                  color: "white",
                  backdropFilter: "blur(4px)"
                }}
              />
            </Box>
            
            {/* Right Details Area */}
            <Box sx={{ flex: 2, display: "flex", flexDirection: "column", borderLeft: { md: "1px solid rgba(255,255,255,0.1)" } }}>
              <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6" fontWeight="bold">{viewItem.title}</Typography>
                  <Chip 
                    label={viewItem.status} 
                    size="small" 
                    color={viewItem.status === 'published' ? 'success' : viewItem.status === 'scheduled' ? 'primary' : 'default'}
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  />
                </Box>
                <IconButton onClick={() => setViewItem(null)} size="small" sx={{ color: "text.secondary" }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", gap: 3, overflowY: "auto", maxHeight: 600 }}>
                
                {/* Description & Hashtags Area */}
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">Caption & Tags</Typography>
                    {viewItem.status !== 'published' && !inlineEdit && (
                      <Button size="small" startIcon={<EditIcon />} onClick={() => setInlineEdit(true)} sx={{ textTransform: "none", color: "text.secondary" }}>
                        Edit
                      </Button>
                    )}
                    {inlineEdit && (
                      <Button size="small" startIcon={<SaveIcon />} color="primary" onClick={() => {
                        const tags = inlineHashtags.split(' ').filter(t => t.trim() !== '');
                        const updatedAssets = assets.map(a => a.id === viewItem.id ? { ...a, description: inlineDesc, hashtags: tags } : a);
                        setAssets(updatedAssets);
                        setInlineEdit(false);
                        setViewItem({ ...viewItem, description: inlineDesc, hashtags: tags });
                      }} sx={{ textTransform: "none" }}>
                        Save
                      </Button>
                    )}
                  </Box>

                  {inlineEdit ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <TextField 
                        multiline 
                        minRows={3} 
                        value={inlineDesc} 
                        onChange={(e) => setInlineDesc(e.target.value)} 
                        placeholder="Write a description..."
                        size="small"
                        sx={{ "& .MuiOutlinedInput-root": { p: 1, fontSize: "0.9rem" } }}
                      />
                      <TextField 
                        value={inlineHashtags} 
                        onChange={(e) => setInlineHashtags(e.target.value)} 
                        placeholder="e.g. #marketing #new"
                        size="small"
                        sx={{ "& .MuiOutlinedInput-root": { fontSize: "0.9rem" } }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1.5, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>
                        {viewItem.description}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {viewItem.hashtags?.map((tag, idx) => (
                          <Typography key={idx} variant="body2" color="primary.main">{tag}</Typography>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Details Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Type</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ textTransform: "capitalize" }}>{viewItem.type}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Score</Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">{viewItem.score}</Typography>
                  </Box>
                  
                  {/* Date/Time Pickers (Inline) */}
                  {viewItem.status !== 'published' ? (
                    <>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Schedule Date</Typography>
                        <TextField 
                          type="date" 
                          size="small" 
                          variant="standard" 
                          fullWidth
                          value={inlineDate} 
                          onChange={e => setInlineDate(e.target.value)} 
                          sx={{ mt: 0.5, "& input": { color: "white", fontSize: "0.85rem", py: 0.5 } }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Schedule Time</Typography>
                        <TextField 
                          type="time" 
                          size="small" 
                          variant="standard" 
                          fullWidth
                          value={inlineTime} 
                          onChange={e => setInlineTime(e.target.value)} 
                          sx={{ mt: 0.5, "& input": { color: "white", fontSize: "0.85rem", py: 0.5 } }}
                        />
                      </Box>
                    </>
                  ) : (
                    <Box>
                      <Typography variant="caption" color="text.secondary">Published Date</Typography>
                      <Typography variant="body2" fontWeight="bold">{viewItem.date ? viewItem.date.replace('T', ' ') : 'Live'}</Typography>
                    </Box>
                  )}
                </Box>

                {/* Actions Section */}
                <Box sx={{ mt: "auto", pt: 3, display: "flex", flexDirection: "column", gap: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  
                  {/* Draft State Actions */}
                  {viewItem.status === 'draft' && (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button 
                        variant="contained" 
                        sx={{ flex: 1, bgcolor: "#10B981", color: "white", py: 1.5, fontWeight: "bold", "&:hover": { bgcolor: "#059669" } }}
                        onClick={() => {
                          const tags = inlineHashtags.split(' ').filter(t => t.trim() !== '');
                          const updatedAssets = assets.map(a => a.id === viewItem.id ? { ...a, status: 'published', description: inlineDesc, hashtags: tags } : a);
                          setAssets(updatedAssets);
                          setViewItem(null);
                        }}
                      >
                        Post Now
                      </Button>
                      <Button 
                        variant="contained" 
                        sx={{ flex: 1, bgcolor: "#3B82F6", color: "white", py: 1.5, fontWeight: "bold", "&:hover": { bgcolor: "#2563EB" } }}
                        onClick={() => {
                          if (!inlineDate || !inlineTime) return alert("Please select a date and time");
                          const tags = inlineHashtags.split(' ').filter(t => t.trim() !== '');
                          const formattedDate = `${inlineDate}T${inlineTime}`;
                          const updatedAssets = assets.map(a => a.id === viewItem.id ? { ...a, status: 'scheduled', date: formattedDate, description: inlineDesc, hashtags: tags } : a);
                          setAssets(updatedAssets);
                          setViewItem(null);
                        }}
                      >
                        Schedule
                      </Button>
                    </Box>
                  )}

                  {/* Scheduled State Actions */}
                  {viewItem.status === 'scheduled' && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button 
                        variant="contained" 
                        sx={{ flex: 1, bgcolor: "#10B981", color: "white", py: 1.5, fontWeight: "bold", "&:hover": { bgcolor: "#059669" }, fontSize: "0.8rem" }}
                        onClick={() => {
                          const tags = inlineHashtags.split(' ').filter(t => t.trim() !== '');
                          const updatedAssets = assets.map(a => a.id === viewItem.id ? { ...a, status: 'published', description: inlineDesc, hashtags: tags } : a);
                          setAssets(updatedAssets);
                          setViewItem(null);
                        }}
                      >
                        Post Now
                      </Button>
                      <Button 
                        variant="contained" 
                        sx={{ flex: 1, bgcolor: "#3B82F6", color: "white", py: 1.5, fontWeight: "bold", "&:hover": { bgcolor: "#2563EB" }, fontSize: "0.8rem" }}
                        onClick={() => {
                          if (!inlineDate || !inlineTime) return alert("Please select a date and time");
                          const tags = inlineHashtags.split(' ').filter(t => t.trim() !== '');
                          const formattedDate = `${inlineDate}T${inlineTime}`;
                          const updatedAssets = assets.map(a => a.id === viewItem.id ? { ...a, status: 'scheduled', date: formattedDate, description: inlineDesc, hashtags: tags } : a);
                          setAssets(updatedAssets);
                          setViewItem(null);
                        }}
                      >
                        Update Schedule
                      </Button>
                      <Button 
                        variant="contained" 
                        sx={{ flex: 1, bgcolor: "#EF4444", color: "white", py: 1.5, fontWeight: "bold", "&:hover": { bgcolor: "#DC2626" }, fontSize: "0.8rem" }}
                        onClick={() => {
                          const updatedAssets = assets.map(a => {
                            if (a.id === viewItem.id) {
                              const { date, ...rest } = a;
                              return { ...rest, status: 'draft' };
                            }
                            return a;
                          });
                          setAssets(updatedAssets);
                          setViewItem(null);
                        }}
                      >
                        Unschedule
                      </Button>
                    </Box>
                  )}

                  {/* Published State Message */}
                  {viewItem.status === 'published' && (
                    <Typography variant="body2" color="success.main" fontWeight="bold" textAlign="center">
                      ✓ This asset is currently live and published.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>



      {/* Summary List Modal */}
      <Dialog 
        open={isSummaryListOpen} 
        onClose={() => setIsSummaryListOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            maxHeight: "80vh"
          }
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">{summaryListTitle}</Typography>
          <IconButton onClick={() => setIsSummaryListOpen(false)} size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <List sx={{ width: '100%', bgcolor: 'transparent' }}>
            {summaryListItems.map((item) => (
              <ListItem 
                key={item.id} 
                button 
                onClick={() => { setIsSummaryListOpen(false); handleOpenDetail(item); }}
                sx={{ 
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" }
                }}
              >
                <ListItemAvatar>
                  <Avatar src={item.url} variant="rounded" sx={{ width: 48, height: 48 }} />
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="body1" fontWeight="bold">{item.title}</Typography>} 
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Chip 
                        label={item.status} 
                        size="small" 
                        color={item.status === 'published' ? 'success' : item.status === 'scheduled' ? 'primary' : 'default'}
                        sx={{ textTransform: "capitalize", fontSize: "0.6rem", height: 20 }}
                      />
                      {item.date && item.status === 'scheduled' && (
                        <Typography variant="caption" color="text.secondary">{item.date.replace('T', ' ')}</Typography>
                      )}
                    </Box>
                  } 
                />
                <Button variant="outlined" size="small" sx={{ minWidth: "auto", px: 2 }}>
                  View
                </Button>
              </ListItem>
            ))}
            {summaryListItems.length === 0 && (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography color="text.secondary">No assets found in this category.</Typography>
              </Box>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ContentVault;
