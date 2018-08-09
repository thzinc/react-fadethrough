import React, { Component } from 'react'

export default class Fadethrough extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0
    }

    this.next = this.next.bind(this)
    this.getInterval = this.getInterval.bind(this)
  }

  componentDidMount() {
    this.intervalHandle = setInterval(
      this.next,
      this.getInterval()
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.interval !== prevProps.interval) {
      clearInterval(this.intervalHandle)
      this.intervalHandle = setInterval(
        this.next,
        this.getInterval()
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle)
  }

  getInterval() {
    return this.props.interval || 3000
  }

  next() {
    const i = (this.state.activeIndex + 1) % this.props.children.length
    this.setState(prevState => ({ activeIndex: i || 0 }))
  }

  render() {

    const containerStyle = {
      width: this.props.width || '100%',
      height: this.props.height || '100%',
      position: 'relative',
      overflow: 'hidden',
    }

    const inactiveStyle = {
      position: 'absolute',
      transition: 'opacity 2s',
      opacity: '0',
    }

    const activeStyle = {
      position: 'absolute',
      transition: 'opacity 2s',
      width: '100%',
      height: '100%'
    }

    return (
      <div style={ containerStyle }>
        { this.props.children.map((child, index) => (
          <div
            key={ 'fadethrough-item' + index }
            style={ index === this.state.activeIndex ? activeStyle : inactiveStyle }
          >
            { child }
          </div>
        )) }
      </div>
    )
  }
}
