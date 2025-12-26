import { supabase } from '../supabase.js'

export const portfolioService = {
  // Get all projects
  async getProjects() {
    try {
      console.log('Fetching projects from Supabase...')
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Projects fetched successfully:', data)
      return data || []
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  },

  // Add new project
  async addProject(project) {
    try {
      console.log('Adding project:', project)
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          category: project.category,
          year: project.year,
          description: project.description,
          technologies: project.technologies,
          image: project.image,
          image2: project.image2,
          images: project.images || [],
          link: project.link
        }])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Project added successfully:', data[0])
      return data[0]
    } catch (error) {
      console.error('Error adding project:', error)
      throw error
    }
  },

  // Update project
  async updateProject(id, project) {
    try {
      console.log('Updating project:', id, project)
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          category: project.category,
          year: project.year,
          description: project.description,
          technologies: project.technologies,
          image: project.image,
          image2: project.image2,
          images: project.images || [],
          link: project.link
        })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Project updated successfully:', data[0])
      return data[0]
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  // Delete project
  async deleteProject(id) {
    try {
      console.log('Deleting project:', id)
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Project deleted successfully')
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file) {
    try {
      console.log('Uploading image:', file.name)

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `portfolio-images/${fileName}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Supabase storage error:', error)
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)

      console.log('Image uploaded successfully:', publicUrl)
      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }
}