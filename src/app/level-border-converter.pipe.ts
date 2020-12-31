import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelBorderConverter'
})
export class LevelBorderConverterPipe implements PipeTransform {

  transform(value: number, ...args: any): any {
    return this.setProfIcoBorder(value);
  }

  setProfIcoBorder(lvl: number): string {
    let res = 0;
    if (lvl > 0 && lvl < 30) {
      res = 1;
    } else if (lvl >= 30 && lvl < 50) {
      res = 30;
    } else if (lvl >= 50 && lvl < 500) {
      for (let i = 50; i <= lvl; i += 25) {
        if (i <= lvl && lvl < i + 25) {
          res = i;
        }
      }
    } else if (lvl == null) {
      return null;
    } else {
      res = 500;
    }
    return '/assets/images/level/' + res + '.png';
  }

}
