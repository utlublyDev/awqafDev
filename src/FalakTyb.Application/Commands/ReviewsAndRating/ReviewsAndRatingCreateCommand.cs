
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ReviewsAndRatingCreateCommand : IRequest<ReviewsAndRating>
    {
        public ReviewsAndRating ReviewsAndRating { get; set; }
    }
}
