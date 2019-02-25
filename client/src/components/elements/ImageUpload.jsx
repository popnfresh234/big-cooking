/* eslint class-methods-use-this: 0 */ // --> OFF
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import Spacer from './Spacer.jsx';


class ImageUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      fileUrl: 'https://s3-us-west-2.amazonaws.com/big-cooking-recipe-images/place-holder.png',
    };
    this.handleChange = this.handleChange.bind( this );
    this.resize = this.resize.bind( this );
    this.resizeImage = this.resizeImage.bind( this );
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( {
      fileUrl: nextProps.imageUrl,
    } );
  }

  handleChange( e ) {
    let oldFileName = this.state.fileUrl.replace( 'https://s3-us-west-2.amazonaws.com/big-cooking-recipe-images/', '' );
    oldFileName = oldFileName.replace( /\.[^/.]+$/, '' );
    let filename = '';
    if ( this.props.editing && oldFileName !== 'place-holder' ) {
      filename = oldFileName;
    } else {
      filename = uuidv4();
    }
    const file = e.target.files[0];
    this.resize( file, 300, 300, 'png', ( resizedDataUrl ) => {
      this.setState( {
        fileUrl: resizedDataUrl,
      } );
      const binary = atob( resizedDataUrl.split( ',' )[1] );
      const array = [];
      for ( let i = 0; i < binary.length; i++ ) {
        array.push( binary.charCodeAt( i ) );
      }
      const blob = new Blob( [new Uint8Array( array )], { type: 'image/png' } );
      const newFile = new File( [blob], `${filename}.png`, { type: blob.type } );
      this.props.addImage( newFile, this.state.fileUrl );
    } );
  }

  resize( file, maxWidth, maxHeight, extension, fn ) {
    const reader = new FileReader();
    const { resizeImage } = this;
    reader.readAsDataURL( file );
    reader.onload = ( event ) => {
      const dataUrl = event.target.result;
      const image = new Image();
      image.src = dataUrl;
      image.onload = () => {
        const resizedDataUrl = resizeImage( image, maxWidth, maxHeight, 1, extension );
        fn( resizedDataUrl );
      };
    };
  }

  resizeImage( image, maxWidth, maxHeight, quality, extension ) {
    const canvas = document.createElement( 'canvas' );
    const ctx = canvas.getContext( '2d' );
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    ctx.fillStyle = '#FFFFE0';
    ctx.fillRect( 0, 0, maxWidth, maxHeight );
    let sX = 0;
    let sY = 0;
    let dX = 0;
    let dY = 0;
    let sourceW = image.width;
    let sourceH = image.height;
    let destinationW = image.width;
    let destinationH = image.height;


    if ( image.width < maxHeight && image.height < maxHeight ) {
      // Case 1: Both width && height < max dimension
      // draw source image in center of 1000 * 1000 box
      dX = ( maxWidth - image.width ) / 2;
      dY = ( maxHeight - image.height ) / 2;
    } else if ( image.width > maxWidth && image.height < maxHeight ) {
      // Case 2: Width is > 1000, height < 1000 (wide rectangle) center crop width
      dY = ( maxHeight - image.height ) / 2;
      sX = ( image.width / 2 ) - ( maxWidth / 2 );
      sourceW = maxWidth;
      destinationW = maxWidth;
    } else if ( image.width < maxWidth && image.height > maxHeight ) {
      // Case 3:  Width < 1000, height > 1000 (tall rectangle) center crop height
      dX = ( maxWidth - image.width ) / 2;
      sY = ( image.width / 2 ) - ( maxWidth / 2 );
      sourceH = maxHeight;
      destinationH = maxHeight;
    } else if ( image.width > maxWidth && image.height > maxHeight ) {
      // Case 4:  Width && height > 1000
      // scale image so smallest of width/height === 1000, crop center of resulting image
      const smallestSide = Math.min( image.width, image.height );
      const multiplier = maxWidth / smallestSide;
      const resizedWidth = image.width * multiplier;
      const resizedHeight = image.height * multiplier;
      destinationW = maxWidth;
      destinationH = maxHeight;
      if ( image.width > image.height ) {
        const startX = ( resizedWidth / 2 ) - ( maxWidth / 2 );
        sX = startX / multiplier;
        sourceW = maxWidth / multiplier;
      } else if ( image.height > image.width ) {
        const startY = ( resizedHeight / 2 ) - ( maxWidth / 2 );
        sY = startY / multiplier;
        sourceH = maxHeight / multiplier;
      }
    }

    ctx.drawImage( image, sX, sY, sourceW, sourceH, dX, dY, destinationW, destinationH );
    return canvas.toDataURL( `image/${extension}`, quality );
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <img className="img-new-recipe" src={this.state.fileUrl} alt="upload" />
          </div>
        </div>
        <Spacer size="m" />
        <div className="row">
          <div className="col-xs-12">
            <input className="input-new-recipe-img" type="file" onChange={this.handleChange} />
          </div>
        </div >
      </div>
    );
  }
}

export default ImageUpload;

