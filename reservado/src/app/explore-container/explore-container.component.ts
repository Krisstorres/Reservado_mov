import { Component, Input, ViewChild ,ElementRef} from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @ViewChild  ('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  images=[
    'assets/images/Slide1.svg',
    'assets/images/Slide2.svg',
    'assets/images/Slide3.svg'
  ]

  @Input() name?: string;
  
  
  
  swiperReady(){
    this.swiper=this.swiperRef?.nativeElement.swiper;
  }
  goNext(){
    this.swiper?.slideNext();
  }
  goPrev(){
    this.swiper?.slidePrev();
  }
  swiperSlideChanged(e:any){
    console.log('changed',e);
  }
}
