// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))

    this.setState({isLoading: false, blogsData: formattedData})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blogs-list-container">
        {/* FIX16: The testid attribute value should be "loader" */}
        {isLoading ? (
          // eslint-disable-next-line react/no-unknown-property
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlogItem => (
              <BlogItem key={eachBlogItem.id} blogDetails={eachBlogItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default BlogList
