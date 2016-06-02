/**
 * Created by anaval on 6/1/2016.
 */
angular.module('mdKendoInput',[])
    .factory('mdKendoSettings',function(){
        var factorylist = {};
        factorylist.focusColor = 'blue';//default
        factorylist.setFocusColor = function(color){
            factorylist.focusColor = color;
        };
        factorylist.getFocusColor = function(){
            return factorylist.focusColor;
        };
        return factorylist;
    })
    .directive('kendoInputContainer',function(mdKendoSettings){
    return{
        restrict:'E',
        priority:0,
        link:function(scope,element,attr){
            //-------------------------------
            var labelsize = element.find('label').css('font-size');
            var labelcolor = element.find('label').css('color');
            var linecolor = element.find('.k-widget').find('.k-picker-wrap,.k-dropdown-wrap').css('border-color');
            var sizeDownLabel = function(){
                element.find('label').css({'font-size':Number(labelsize.toString().replace('px',''))*0.8});
            };
            var sizeUpLabel = function(){
                element.find('label').css({'font-size':Number(labelsize.toString().replace('px',''))});
            };
            var colorLabel = function(){
                element.find('label').css({color:mdKendoSettings.getFocusColor()});
                element.find('.k-widget').find('.k-picker-wrap,.k-dropdown-wrap').css({'border-color':mdKendoSettings.getFocusColor()});
            };
            var discolorLabel = function(){
                element.find('label').css({color:labelcolor});
                element.find('.k-widget').find('.k-picker-wrap,.k-dropdown-wrap').css({'border-color':linecolor});
            };
            //----------focus events---------
            element.focusin(function(){
                element.addClass('k-container-focus');
                sizeDownLabel();
                colorLabel();
            });
            element.focusout(function(){
                var hasfocus = element.find('span.k-state-focus').length;
                if(!hasfocus){
                    element.removeClass('k-container-focus');
                    if(!element.hasClass('k-container-has-value')){
                        sizeUpLabel();
                    }
                }
                discolorLabel();
            });
            //------value change events----------
            var hasNgModel = element.find('*[ng-model]').length;
            var hasKNgModel = element.find('*[k-ng-model]').length;
            if(hasNgModel){
                var modelToWatch = element.find('*[ng-model]').attr('ng-model');
                scope.$watch(modelToWatch,function(newVal,oldVal){
                    if(newVal){
                        element.addClass('k-container-has-value');
                        sizeDownLabel();
                    }else{
                        element.removeClass('k-container-has-value');
                        if(!element.hasClass('k-container-focus')){
                            sizeUpLabel();
                        }
                    }
                });
            }else if(hasKNgModel){
                var modelToWatch = element.find('*[k-ng-model]').attr('k-ng-model');
                scope.$watch(modelToWatch,function(newVal,oldVal){
                    if(newVal){
                        element.addClass('k-container-has-value');
                        sizeDownLabel();
                    }else{
                        element.removeClass('k-container-has-value');
                        if(!element.hasClass('k-container-focus')){
                            sizeUpLabel();
                        }
                    }
                });
            }
        }
    }
});