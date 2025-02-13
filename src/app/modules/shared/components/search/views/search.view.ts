import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
// import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'search',
  templateUrl: 'search.view.html',
  styleUrls: [ 'search.view.scss' ]
})
export class SearchView {

  @Output() changeValue = new EventEmitter<string>();
  @Input() placeholder: string;

  @Input() set currValue(value: string) {
    this._value = value;
  }

  private _value = '';

  set value(value: string) {
    of(value)
      .pipe(tap(val => this.changeValue.emit(val))).subscribe();
  }

  get value() {
    return this._value;
  }

  constructor(
    // private _speechRecognition: SpeechRecognition,
    private _cd: ChangeDetectorRef) {
  }

  onSearch(event) {
    this.value = event.target.value && event.target.value.trim();
  }

  // onSpeech() {
  //   this._speechRecognition.requestPermission()
  //     .then(res => {
  //       this._speechRecognition.startListening()
  //         .subscribe(
  //           (matches: string[]) => {
  //             this._value = matches[0];
  //             this._cd.detectChanges();
  //           },
  //           err => console.log(err)
  //         );
  //     });
  // }

}
