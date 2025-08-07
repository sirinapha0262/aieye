// EyeDiseaseUploader.jsx

import React, { useState } from 'react';
import axios from 'axios';
import {Button,Typography,Box,List,ListItem,ListItemIcon,ListItemText,CircularProgress,Alert,Avatar,
  Card,CardContent,CardMedia,Container,Grid,Chip,LinearProgress,useTheme,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import {CloudUpload,Description,LocalHospital,InsertPhoto,Info} from '@mui/icons-material';

function EyeDisease() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const theme = useTheme();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleUpload = async () => {
    if (!image) {
      setError('กรุณาเลือกรูปภาพก่อนอัปโหลด');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ py: { xs: 0, md: -1 }, px: { xs: 1.5, md: 0 } }}>
      <Card sx={{ 
        mb: 2, 
        boxShadow: 1, 
        mx: { xs: 0, md: 0 },
        width: '100%',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: theme.palette.divider
      }}>
        <CardContent sx={{ p: 1 }}>
          <Box sx={{ textAlign: 'center', py: { xs: 1, md: 2 } }}>
            <Avatar sx={{
              bgcolor: theme.palette.primary.light,
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              mb: 1,
              mx: 'auto'
            }}>
              <InsertPhoto fontSize={theme.breakpoints.up('md') ? "large" : "medium"} />
            </Avatar>

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="eye-disease-upload"
              type="file"
              onChange={handleImageChange}
            />

            <Grid container spacing={1} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <label htmlFor="eye-disease-upload">
                  <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUpload />}
                    sx={{
                      borderRadius: 1,
                      px: { xs: 1, md: 1 },
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', md: '1rem' },
                      width: '100%'
                    }}
                  >
                    เลือกรูปภาพ
                  </Button>
                </label>
              </Grid>

              <Grid item xs={12} sm={6} md={8}>
                <Typography 
                  variant="body1" 
                  color="textSecondary" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', md: '1rem' },
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    px: 1
                  }}
                >
                  {image?.name || 'ยังไม่ได้เลือกรูปภาพ'}
                </Typography>
              </Grid>
            </Grid>

            {previewUrl && (
              <CardMedia
                component="img"
                alt="ภาพที่อัปโหลด"
                sx={{
                  maxHeight: { xs: 180, md: 200 },
                  width: 'auto',
                  mx: 'auto',
                  my: 2,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
                src={previewUrl}
              />
            )}

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleUpload}
              disabled={!image || loading}
              sx={{
                mt: 2,
                py: 1,
                color: 'white',
                bgcolor: theme.palette.secondary.main,
                px: 1,
                borderRadius: 0,
                textTransform: 'none',

                fontSize: { xs: '0.9rem', md: '0.95rem' }
              }}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'กำลังวิเคราะห์...' : 'เริ่มวิเคราะห์'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2, mx: { xs: 0, md: 1 } , fontSize: '0.8rem' }} icon={<Info />}>
          <Typography variant="body1">{error}</Typography>
        </Alert>
      )}

      {result && (
        <Grid container spacing={1} sx={{ px: { xs: 0, md: 1 } }}>
          <Grid item xs={12} md={7}>
            <ResultCard result={result} confidence={result.confidence} />
          </Grid>

          <Grid item xs={12} md={5}>
            <RecommendationCard recommendation={result.recommendation.th} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

const ResultCard = ({ result, confidence }) => {
  const theme = useTheme();

  const getColor = (percent) => {
    if (percent >= 70) return theme.palette.success.main;
    if (percent >= 40) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Card sx={{ 
      height: '100%', 
      borderRadius: 2,
      mx: { xs: 0, md: 1 },
      boxShadow: 1,
      border: '1px solid',
      borderColor: theme.palette.divider
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Description color="primary" sx={{ mr: 1, fontSize: { xs: 24, md: 28 } }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            ผลการวินิจฉัย
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Chip
            label={result.prediction.th}
            color="primary"
            sx={{
              mb: 0.5,
              px: 2,
              py: 0.5,
              fontSize: { xs: '0.9rem', md: '1rem' },
              borderRadius: 0.5
            }}
          />
          <LinearProgress
            variant="determinate"
            value={confidence}
            sx={{
              height: { xs: 5, md: 6 },
              borderRadius: 2,
              backgroundColor: theme.palette.grey[300],
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
                backgroundColor: getColor(confidence)
              }
            }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            ความมั่นใจ: {confidence}%
          </Typography>
        </Box>

        <List dense sx={{ bgcolor: 'background.paper' }}>
          {result.details.map((item, idx) => (
            <ListItem key={idx} divider>
              <ListItemIcon>
                <Info color="action" />
              </ListItemIcon>
              <ListItemText
                primary={`${item.class.th} (${item.probability}%)`}
                secondary={item.class.en}
                primaryTypographyProps={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                secondaryTypographyProps={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const RecommendationCard = ({ recommendation }) => (
  <Card
    sx={{
      height: { xs: 'auto', md: 180 },
      minHeight: 180,
      borderRadius: 2,
      mt: { xs: 1, md: 0 },
      bgcolor: 'success.light',
      transition: 'transform 0.3s',
      '&:hover': { transform: 'scale(1.02)' },
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 1,  
      border: '1px solid',  
      
    }}
  >
    <CardContent
      sx={{
        p: 1,
        textAlign: 'left',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <LocalHospital color="success" sx={{ mr: 1, fontSize: { xs: 24, md: 28 } }} />
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          คำแนะนำ
        </Typography>
      </Box>

      <Box
        sx={{
           bgcolor: 'background.paper',
          p: 1,  // Reduced padding
          borderRadius: 1,  // Smaller radius
          fontSize: { xs: '0.7rem', md: '0.8rem' },  // Smaller font
          flex: 1
        }}
      >
        {recommendation}
      </Box>
    </CardContent>
  </Card>
);

export default EyeDisease;
