
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ReviewsAndRatingGetAllQuery : IRequest<IPage<ReviewsAndRating>>
    {
        public IPageable Page { get; set; }
    }
}
