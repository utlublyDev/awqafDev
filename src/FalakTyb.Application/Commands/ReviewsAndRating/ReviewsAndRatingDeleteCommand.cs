using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ReviewsAndRatingDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
