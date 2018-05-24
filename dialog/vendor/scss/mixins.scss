$m-root-font-size: 75;

@function rem($value){
  @return #{$value/$m-root-font-size}rem;
}

// 1像素边框
@mixin r1-border($color:#D5D5D5, $radius:0){
  position: relative;

  &::after{
    position: absolute;
    content: "";
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    box-sizing: border-box;
    -webkit-box-sizing: border-box;

    border: 1px solid $color;
    pointer-events: none;

    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;

    @if $radius!=0{
      border-radius: $radius;
      -webkit-border-radius: $radius;
    }

    @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {
      &::after{
        width: 200%;
        height: 200%;
        -webkit-transform: scale(.5);
        transform: scale(.5);
      }
    }

    @media (-webkit-device-pixel-ratio: 1.5) {
      &::after{
        width: 150%;
        height: 150%;
        -webkit-transform: scale(.6666);
        transform: scale(.6666);
      }
    }

    @media (-webkit-device-pixel-ratio: 3) {
      &::after{
        width: 300%;
        height: 300%;
        -webkit-transform: scale(.3333);
        transform: scale(.3333);
      }
    }
  }
}