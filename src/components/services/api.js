import axios from 'axios';

export default async function fecthPhotos(value, numOfPage) {
  try {
    const {
      data: { hits },
    } = await axios.get(
      `https://pixabay.com/api/?q=${value}&page=${numOfPage}&key=31554206-44eb8eb4918d364b6fc8ad198&image_type=photo&orientation=horizontal&per_page=12`
    );
    return hits;
  } catch (error) {
    return error.message;
  }
}
