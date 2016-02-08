module StaticPagesHelper

  def number_humanize(number)
    number==1 ? 'one' : number==2 ? 'two' : number==3 ? 'three' : number.to_s
  end

  def masked_size_class(index)
    mask = index==0 ? 'masked-big' : [1,2].include?(index) ? 'masked-small' : 'masked-small no-margin-bottom'
    "masked #{mask}"
  end

  def entries_with_impressionist_count(entries)
    EntryPresenter.decorate_collection(entries).
      map{ |e| [e, e.impressionist_count(:filter => :all)]}
  end

end
