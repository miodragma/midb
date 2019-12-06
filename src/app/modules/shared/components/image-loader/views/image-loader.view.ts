import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'image-loader',
  templateUrl: 'image-loader.view.html',
  styleUrls: [ 'image-loader.view.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLoaderView {

  @Input() spinnerWrapperHeight = '';
  @Input() spinnerWrapperWidth = '';
  @Input() spinnerMarginTop = '';
  @Input() spinnerMarginLeft = '';
  @Input() spinnerWidth = '';
  @Input() imageStyle = '';

  oneLoader = true;

  @Input() set src(src: string) {
    this.oneLoader && (this._isImageLoaded = false);
    this._src = src;
  }

  get src(): string {
    return this._src;
  }

  @Output() load = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();

  private _src: string;
  private _isImageLoaded = false;

  get isImageLoaded(): boolean {
    return this._isImageLoaded;
  }

  onLoad() {
    this.oneLoader = false;
    this._isImageLoaded = true;
    this.load.emit();
  }

  onError() {
    this._isImageLoaded = true;
    this.error.emit();
    this._src = './assets/images/na.png';
  }

}
