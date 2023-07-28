
document.addEventListener("DOMContentLoaded", function () {
  $('#id_description').summernote({
      'plugins': {
          'toc': {}
      },
    });
    var layoutInfo = $('#id_description').next('.note-editor').find('.note-editable').data('summernote').layoutInfo;
    var context = $.summernote.renderer.getEditor(layoutInfo);
    var self = this;
    var $note = context.layoutInfo.note;
    var $editor = context.layoutInfo.editor;
    var $editable = context.layoutInfo.editable;
    this.initialize = function () {
      var button = '<button type="button" class="note-btn btn btn-default btn-sm" title="Table of Contents" data-toggle="modal" data-target="#tocModal">TOC</button>';
      context.memo('button.toc', function () {
        return button;
      });

      $note.find('.note-btn.toc').on('click', function () {
        self.showTOC();
      });
    };

    this.showTOC = function () {
      var content = $editable.html();
      var headings = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/gi);

      var tocHTML = '<ul>';
      if (headings) {
        for (var i = 0; i < headings.length; i++) {
          var headingText = headings[i].replace(/<[^>]+>/g, '');
          tocHTML += '<li><a href="#toc_heading_' + i + '">' + headingText + '</a></li>';
        }
      }
      tocHTML += '</ul>';

      var modalHTML = '<div class="modal fade" id="tocModal" tabindex="-1" role="dialog" aria-labelledby="tocModalLabel" aria-hidden="true">';
      modalHTML += '<div class="modal-dialog modal-dialog-centered" role="document">';
      modalHTML += '<div class="modal-content">';
      modalHTML += '<div class="modal-header">';
      modalHTML += '<h5 class="modal-title" id="tocModalLabel">Table of Contents</h5>';
      modalHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
      modalHTML += '<span aria-hidden="true">&times;</span>';
      modalHTML += '</button>';
      modalHTML += '</div>';
      modalHTML += '<div class="modal-body">';
      modalHTML += tocHTML;
      modalHTML += '</div>';
      modalHTML += '<div class="modal-footer">';
      modalHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
      modalHTML += '</div>';
      modalHTML += '</div>';
      modalHTML += '</div>';
      modalHTML += '</div>';

      $('body').append(modalHTML);
      $('#tocModal').modal('show');
    };

    context.memo('button.toc', function () {
      return button;
    });
  });
