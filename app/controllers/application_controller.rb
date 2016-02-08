class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :navigation
  before_action :sidebar

  def navigation
    @categories = Category.parent_categories.order(name: :asc).limit(5)
  end

  def sidebar
    @entries = Entry.order(created_at: :desc, type: :asc).limit(30)
    @page_counter = Impression.uniq.count
    @most_popular_entries = Entry.by_impressions_grouping.take(5)
    @recent_entries = EntryPresenter.decorate_collection(@entries.last(5)) # published_at?
    @ads = EntryPresenter.decorate_collection(@entries.by_type(Ad).take(4))
    @most_recent_video = Video.last
    @last_comments = [] # Comment.last(5)
  end
end
