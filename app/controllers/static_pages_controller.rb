class StaticPagesController < ApplicationController
  impressionist :actions=>[:index]

  def index
    @highlighted_entries = decorate(@entries.each_type.take(4))
    @headlines = @entries.where(published_at: Date.today).pluck(:id, :title)
    @portfolios_images = portfolios_images(
      EntryPresenter.decorate_collection(@entries.by_type(Portfolio).last(2)))
    @entries = decorate(entries_two_or_limit_by_type(@entries)).last(8)
    @galery = decorate(Entry.first(4))
  end

  private
  def decorate(scope)
    EntryPresenter.decorate_collection(scope)
  end

  def entries_two_or_limit_by_type(entries_param)
    grouped_entries = entries_param.group_by{ |e| e.type }
    grouped_entries.map do |type, entries|
      limit = grouped_entries[type].size < 2 ? grouped_entries[type].size : 1
      grouped_entries[type][0..limit]
    end.flatten.sort { |a,b| a.type <=> b.type }
  end

  def portfolios_images(entries)
    images_url = []
    entries.map { |e| e.assets.each { |a| images_url << a.file.url(:medium) } }
    images_url
  end

end
