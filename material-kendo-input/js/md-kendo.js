/**
 * Created by 666 on 6/1/2016.
 */
angular.module('mdKendoInput',[]).directive('kendoInputContainer',function(){
    return{
        restrict:'E',
        priority:0,
        link:function(scope,element,attr){
            //-------------------------------
            var labelsize = element.find('label').css('font-size');
            var sizeDownLabel = function(){
                element.find('label').css({'font-size':Number(labelsize.toString().replace('px',''))*0.8});
            };
            var sizeUpLabel = function(){
                element.find('label').css({'font-size':Number(labelsize.toString().replace('px',''))});
            };
            //----------focus events---------
            element.focusin(function(){
                element.addClass('k-container-focus');
                sizeDownLabel();
            });
            element.focusout(function(){
                var hasfocus = element.find('span.k-state-focus').length;
                if(!hasfocus){
                    element.removeClass('k-container-focus');
                    if(!element.hasClass('k-container-has-value')){
                        sizeUpLabel();
                    }
                }
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