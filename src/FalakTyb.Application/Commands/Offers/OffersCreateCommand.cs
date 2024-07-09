
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class OffersCreateCommand : IRequest<Offers>
    {
        public Offers Offers { get; set; }
    }
}
