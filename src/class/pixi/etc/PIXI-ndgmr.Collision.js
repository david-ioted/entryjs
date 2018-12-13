/*
  The MIT License

  Copyright (c) 2012 Olaf Horstmann, indiegamr.com

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/


import PIXIHelper from '../helper/PIXIHelper';

/**
 * [original]
 * A Pixel Perfect Collision Detection for EaselJS Bitmap-Objects
 * @author olsn, indiegamr.com
 *
 * [edit 2018.09.01]
 * A Pixel Perfect Collision Detection for entryjs PIXI.Sprite-Object
 *
 **/

window.ndgmr = window.ndgmr || {};
(function(ndgmr) {

    //--------- Class CollisionCanvas -------
    function CollisionCanvas () {
        /** @readonly **/
        this.isOffscreenCanvas = false;
        this._canvas = PIXIHelper.getOffScreenCanvas();
        this.isOffscreenCanvas = !(this._canvas instanceof HTMLCanvasElement);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.save();
    }
    (function(p){

        p.render = function(obj, intersectRect) {
            var tex = obj.internal_getOriginalTex();
            if(!tex) return;
            var fr = tex.frame;
            if(!fr || fr.width === 0 || fr.height === 0 ) return;
            if(!tex.baseTexture) return;
            var source = tex.baseTexture.source;
            if(!source) return;

            var IR = intersectRect;
            var canvas = this._canvas;
            var ctx = this._ctx;

            canvas.width = IR.width;
            canvas.height = IR.height;

            _IP.set(IR.x, IR.y);
            obj.toLocal(_IP, null, _LP);

            obj.worldTransform.decompose(_TRANSFORM);

            ctx.restore();
            ctx.save();
            ctx.rotate(_TRANSFORM.rotation);
            ctx.scale(_TRANSFORM.scale.x, _TRANSFORM.scale.y);
            var tx = -_LP.x - _TRANSFORM.pivot.x - fr.width * obj.anchor.x;
            var ty = -_LP.y - _TRANSFORM.pivot.y - fr.height * obj.anchor.y;
            ctx.translate(tx, ty);

            ctx.drawImage(source, fr.x, fr.y, fr.width, fr.height, 0, 0, fr.width, fr.height);
            return ctx.getImageData(0, 0, IR.width, IR.height).data;
        }

    })(CollisionCanvas.prototype);
    //--------- end of Class CollisionCanvas -------


    var threshold = 2;

    /** @type PIXI.Rectangle; **/
    var _RECT1, _RECT2;

    /** @type PIXI.Point. for global to local point **/
    var _LP, _IP; //localPoint, intersect point

    /** @type PIXI.Transform **/
    var _TRANSFORM;

    /** @type CollisionCanvas **/
    var canvas1, canvas2;

    /** @private  use only debug. **/
    ndgmr.___debugIntersectionRect = null;

    ndgmr.initTempObject = function() {
        _RECT1 = new PIXI.Rectangle();
        _RECT2 = new PIXI.Rectangle();
        _LP = new PIXI.Point();
        _IP = new PIXI.Point();
        _TRANSFORM = new PIXI.Transform();
        canvas1 = new CollisionCanvas();
        canvas2 = new CollisionCanvas();
    };

    ndgmr.checkPixelCollision = function(bitmap1, bitmap2, alphaThreshold, getRect) {
        if (ndgmr.DEBUG || ndgmr.DEBUG_COLLISION) {
            if(!canvas1.isOffscreenCanvas) {
                document.body.appendChild(canvas1._canvas);
                document.body.appendChild(canvas2._canvas);
            }
        }

        bitmap1.getBounds(false, _RECT1);
        bitmap2.getBounds(false, _RECT2);

        if(!_collisionDistancePrecheck(_RECT1, _RECT2)) {
            return false;
        }

        var intersection = _checkRectCollisionForPIXIRect(_RECT1,_RECT2);

        ndgmr.___debugIntersectionRect = intersection;

        if ( !intersection ) {
            return false;
        }

        // if (bitmap1 instanceof createjs.Container ||
        //     bitmap2 instanceof createjs.Container) {
        //     return intersection;
        // }

        var iw = intersection.width;
        var ih = intersection.height;

        if (iw === 0 || ih === 0) {
            return false;
        }

        //chrome float point number bug
        if (iw / threshold < 1 || ih / threshold < 1) {
            return false;
        }

        alphaThreshold = Math.min(0.99999, alphaThreshold || 0);

        var imgData1, imgData2;

        if(
            !(imgData1 = canvas1.render(bitmap1, intersection)) ||
            !(imgData2 = canvas2.render(bitmap2, intersection))
        ) {
            return false;
        }

        // threshold 가 왜 height 에는 없지요?
        var pixelIntersection = _compareAlphaValues(
            imgData1,
            imgData2,
            iw / threshold,
            ih / threshold,
            alphaThreshold,
            getRect
        );

        if(!pixelIntersection) {
            return false;
        }

        pixelIntersection.x  += intersection.x;
        pixelIntersection.x2 += intersection.x;
        pixelIntersection.y  += intersection.y;
        pixelIntersection.y2 += intersection.y;

        return pixelIntersection;

    };

    /**
     * precheck if objects are even close enough
     * @param {PIXI.Rectangle} ir1
     * @param {PIXI.Rectangle} ir2
     * @return {boolean}
     * @private
     */
    function _collisionDistancePrecheck(ir1, ir2) {
        return (Math.abs(ir2.x - ir1.x) < (ir1.x < ir2.x ? ir1.width : ir2.width)
            && Math.abs(ir2.y - ir1.y) < (ir1.y < ir2.y ? ir1.height : ir2.height));
    }


    /**
     * TODO createjs 코드 인데.. 사용하느곳이 있는지 확인.
     * createjs legacy interface. not use internally.
     * @param bitmap1
     * @param bitmap2
     * @return {null| Rect}
     */
    ndgmr.checkRectCollision = function(bitmap1,bitmap2) {
        var b1, b2;
        if (bitmap1 instanceof createjs.Container ||
            bitmap2 instanceof createjs.Container) {
            b1 = bitmap1.getTransformedBounds();
            b2 = bitmap2.getTransformedBounds();
        } else {
            b1 = getBounds(bitmap1);
            b2 = getBounds(bitmap2);
        }
        return _checkRectCollisionForPIXIRect(b1, b2);
    };

    function _checkRectCollisionForPIXIRect(b1, b2) {
        if (Math.min(b1.width, b1.height, b2.width, b2.height) < 2)
            threshold = 1;
        else
            threshold = 1;
        return ndgmr.calculateIntersection(b1,b2);
    }


    ndgmr.calculateIntersection = function(rect1, rect2) {
        // first we have to calculate the
        // center of each rectangle and half of
        // width and height
        var dx, dy, r1={}, r2={};
        r1.cx = rect1.x + (r1.hw = (rect1.width /2));
        r1.cy = rect1.y + (r1.hh = (rect1.height/2));
        r2.cx = rect2.x + (r2.hw = (rect2.width /2));
        r2.cy = rect2.y + (r2.hh = (rect2.height/2));

        dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
        dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

        if (dx < 0 && dy < 0) {
            dx = Math.min(Math.min(rect1.width,rect2.width),-dx);
            dy = Math.min(Math.min(rect1.height,rect2.height),-dy);
            return {
                x:Math.max(rect1.x,rect2.x),
                y:Math.max(rect1.y,rect2.y),
                width:dx,
                height:dy,
                rect1: rect1,
                rect2: rect2
            };
        } else {
            return null;
        }
    };

    var _compareAlphaValues = function(imageData1, imageData2, width, height, alphaThreshold, getRect) {
        var x, y, offset = 3,
            pixelRect = {x:Infinity,y:Infinity,x2:-Infinity,y2:-Infinity};

        alphaThreshold *= 255;

        // parsing through the pixels checking for an alpha match
        // TODO: intelligent parsing, not just from 0 to end!
        var LEN1 = imageData1.length;
        var LEN2 = imageData2.length;

        for ( y = 0; y < height; ++y) {
            for ( x = 0; x < width; ++x) {

                if (
                    (LEN1 > offset+1 ? imageData1[offset] : 0) > alphaThreshold &&
                    (LEN2 > offset+1 ? imageData2[offset] : 0) > alphaThreshold
                ) {
                    if ( getRect ) {
                        if ( x < pixelRect.x  ) pixelRect.x  = x;
                        if ( x > pixelRect.x2 ) pixelRect.x2 = x;
                        if ( y < pixelRect.y  ) pixelRect.y  = y;
                        if ( y > pixelRect.y2 ) pixelRect.y2 = y;
                    } else {
                        return {x:x,y:y,width:1,height:1};
                    }
                }
                offset += 4;
            }
        }

        if ( pixelRect.x != Infinity ) {
            pixelRect.width  = pixelRect.x2 - pixelRect.x + 1;
            pixelRect.height = pixelRect.y2 - pixelRect.y + 1;
            return pixelRect;
        }

        return null;
    }





})(window.ndgmr);