import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.css']
})
export class FavoritesItemComponent implements OnInit {
  @Input() filmItem: any;  
  @Input() imgPath: string;
  @Output() unfavorited = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  removeFavorite(id: number) {
    console.log('FavoritesItemComponent removeFavoriteItems')
    this.unfavorited.emit(id);
  }
}
