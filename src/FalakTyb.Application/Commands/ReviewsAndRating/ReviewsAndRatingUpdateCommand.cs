
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ReviewsAndRatingUpdateCommand : IRequest<ReviewsAndRating>
    {
        public ReviewsAndRating ReviewsAndRating { get; set; }
    }
}
