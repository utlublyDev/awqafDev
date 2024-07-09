
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ReviewsAndRatingGetQuery : IRequest<ReviewsAndRating>
    {
        public long Id { get; set; }
    }
}
