using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class OffersCategoriesDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
