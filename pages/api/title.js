import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    try {
        const newContent = 'hello world'; // The content to replace the file with
        const filePath = path.join(process.cwd(), 'layouts/components', 'title.js'); // Path to the title.js file
    
        // Create a new file with the new content
        await fs.promises.writeFile(filePath, newContent);
    
        res.status(200).json({ message: 'File replaced successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error replacing file' });
      }
    
  }